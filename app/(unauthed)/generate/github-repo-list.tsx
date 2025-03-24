"use client";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  // Suspense,
  memo,
} from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
// import dynamic from "next/dynamic";
import { RiGithubFill } from "react-icons/ri";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGroupedRepos } from "@/utils/github/actions";
import updateRepository from "@/utils/github/clientActions";
import { Repo } from "@/db/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { useZustandStore } from "@/state/zustandStore";
// import { Release } from "@/db/types";

// Lazy load components that aren't immediately needed
// const CommitMessages = dynamic(() => import("./commit-messages"), {
//   loading: () => <Skeleton className="h-24 w-full" />,
//   ssr: false,
// });

// interface CommitMessages {
//   [repoName: string]: Release[][];
// }

// Debounce utility with proper typing
const debounce = <T extends (...args: string[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// Separate Repo Item component for better memoization
const RepoItem = memo(
  ({
    repo,
    onImportClick,
    isImported,
  }: {
    repo: Repo;
    onImportClick: (repo: Repo) => Promise<void>;
    isImported: boolean;
  }) => (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <RiGithubFill size={32} />
          <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <Button variant="link" className="ml-2 text-sm font-medium">
              {repo.name}
            </Button>
          </Link>
          {repo.private && <Lock size={16} className="text-muted-foreground" />}
        </div>
        <Button onClick={() => onImportClick(repo)} disabled={isImported}>
          {isImported ? "Imported" : "Import"}
        </Button>
      </div>
    </div>
  )
);
RepoItem.displayName = "RepoItem";

export default function GitHubRepos({ user }: { user: User }) {
  const { repos, setRepos } = useZustandStore();
  const [groupedRepos, setGroupedRepos] = useState<Repo[]>([]);
  const existingRepoIds = useMemo(
    () => new Set(repos.map((r) => r.github_id)),
    [repos]
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  // const [commit_messages, setCommitMessages] = useState<CommitMessages>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRepos, setTotalRepos] = useState<number>(0);
  const router = useRouter();
  const perPage = 30;

  useEffect(() => {
    async function loadGroupedRepos() {
      setLoading(true);
      try {
        const grouped = await fetchGroupedRepos(perPage);
        setGroupedRepos(grouped);
        const total = grouped.length;
        setTotalRepos(total);
      } catch (error) {
        console.error("Error fetching grouped repos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadGroupedRepos();
  }, [perPage]);

  // Memoized filtered repos
  const filteredRepos = useMemo(() => {
    const allRepos = groupedRepos.flat();

    return searchQuery
      ? allRepos.filter((repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allRepos.slice((currentPage - 1) * perPage, currentPage * perPage);
  }, [groupedRepos, currentPage, searchQuery]);

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((query: string) => setSearchQuery(query), 300),
    []
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  const handleImportClick = useCallback(
    async (repo: Repo) => {
      try {
        await updateRepository({
          github_id: Number(repo.id),
          user_id: user.id as string,
          name: repo.name.toLowerCase(),
          owner: repo.owner.login.toLowerCase(),
          html_url: repo.html_url,
          setLoading: setLoading,
        });
        setRepos([...repos, repo]);
        router.push(`/${repo.name}/dashboard`);
      } catch (error) {
        console.error("Error importing repository:", error);
      }
    },
    [user.id, router, repos]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      const totalPages = Math.ceil(totalRepos / perPage);
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalRepos, perPage]
  );

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search repositories..."
        onChange={handleSearchChange}
        className="bg-background"
      />

      <div className="text-sm text-muted-foreground">
        {loading ? (
          <Skeleton className="h-4 w-32" />
        ) : (
          `${totalRepos} repositories found`
        )}
      </div>

      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))
      ) : filteredRepos.length > 0 ? (
        <div className="bg-background divide-y divide-y-border rounded-lg overflow-hidden border">
          {filteredRepos.map((repo) => (
            <RepoItem
              key={`${repo.id}-${repo.name}`}
              repo={repo}
              onImportClick={handleImportClick}
              isImported={existingRepoIds.has(Number(repo.id))}
            />
          ))}
        </div>
      ) : (
        <p>No repositories found.</p>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              isActive={currentPage > 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              isActive={currentPage < Math.ceil(totalRepos / perPage)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
