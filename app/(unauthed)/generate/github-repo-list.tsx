"use client";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
  memo,
} from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import { RiGithubFill } from "react-icons/ri";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGroupedRepos, fetchGroupedCommits } from "@/utils/github/actions";
import updateRepository from "@/utils/github/clientActions";
import { Repo } from "@/app/types/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Lazy load components that aren't immediately needed
const CommitMessages = dynamic(() => import("./commit-messages"), {
  loading: () => <Skeleton className="h-24 w-full" />,
  ssr: false,
});

interface CommitMessages {
  [repoName: string]: string[] | string[][];
}

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
    commitMessages,
  }: {
    repo: Repo;
    onImportClick: (repo: Repo) => Promise<void>;
    commitMessages: CommitMessages;
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
        <Button onClick={() => onImportClick(repo)}>Import</Button>
      </div>
      {commitMessages[repo.name] && (
        <Suspense fallback={<Skeleton className="h-24 w-full" />}>
          <CommitMessages messages={commitMessages[repo.name]} />
        </Suspense>
      )}
    </div>
  )
);
RepoItem.displayName = "RepoItem";

export default function GitHubRepos({ user }: { user: User }) {
  const [repos, setRepos] = useState<Repo[][]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [commitMessages, setCommitMessages] = useState<CommitMessages>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRepos, setTotalRepos] = useState<number>(0);
  const perPage = 30;

  useEffect(() => {
    async function loadGroupedRepos() {
      setLoading(true);
      try {
        const grouped = await fetchGroupedRepos(perPage);
        setRepos(grouped);
        const total = grouped.reduce((sum, group) => sum + group.length, 0);
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
    const allRepos = repos.flat();

    return searchQuery
      ? allRepos.filter((repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allRepos.slice((currentPage - 1) * perPage, currentPage * perPage);
  }, [repos, currentPage, searchQuery]);

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

  const handleImportClick = useCallback(async (repo: Repo) => {
    try {
      const groupedMessages = await fetchGroupedCommits(
        repo.owner.login,
        repo.name
      );
      setCommitMessages((prev) => ({ ...prev, [repo.name]: groupedMessages }));
      await updateRepository({
        github_id: Number(repo.id),
        user_id: user.id as string,
        name: repo.name,
        owner: repo.owner.login,
        html_url: repo.html_url,
        data: repo,
        setLoading: setLoading,
      });
    } catch (error) {
      console.error("Error fetching commit messages:", error);
    }
  }, []);

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
              commitMessages={commitMessages}
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
