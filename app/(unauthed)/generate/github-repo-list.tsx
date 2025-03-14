"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { RiGithubFill } from "react-icons/ri";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchUserRepos,
  fetchGroupedCommits,
} from "@/utils/github/actions";

// Debounce helper function
const debounce = (func: (query: string) => void, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: [string]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

type Repo = {
  id: string;
  name: string;
  html_url: string;
  private: boolean;
  owner: { login: string };
};

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>(repos);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [commitMessages, setCommitMessages] = useState<{
    [repoName: string]: string[] | string[][];
  }>({});

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const fetchedRepos = await fetchUserRepos();
        setRepos(fetchedRepos);
        setFilteredRepos(fetchedRepos);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (query) {
          setFilteredRepos(
            repos.filter((repo) =>
              repo.name.toLowerCase().includes(query.toLowerCase())
            )
          );
        } else {
          setFilteredRepos(repos);
        }
      }, 300),
    [repos]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  // const handleImportClick = async (repo: Repo) => {
  //   try {
  //     const messages = await fetchCommitMessagesRange(
  //       repo.owner.login,
  //       repo.name
  //     );
  //     setCommitMessages((prev) => ({ ...prev, [repo.name]: messages }));
  //   } catch (error) {
  //     console.error("Error fetching commit messages:", error);
  //   }
  // };
  const handleImportClick = async (repo: Repo) => {
    try {
      const groupedMessages = await fetchGroupedCommits(
        repo.owner.login,
        repo.name
      );
      setCommitMessages((prev) => ({ ...prev, [repo.name]: groupedMessages }));
    } catch (error) {
      console.error("Error fetching commit messages:", error);
    }
  };

  return (
    <div>
      {/* Search bar */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-background"
        />
      </div>

      {/* Show skeleton loader while repos are being fetched */}
      {loading ? (
        <>
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
        </>
      ) : filteredRepos.length > 0 ? (
        <div className="bg-background divide-y divide-y-border rounded-lg overflow-hidden border">
          {filteredRepos.map((repo) => (
            <div key={repo.id} className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <RiGithubFill size={32} />
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="link"
                      className="ml-4 text-sm font-medium mr-2"
                    >
                      {repo.name}
                    </Button>
                  </Link>
                  {repo.private && (
                    <Lock size={16} className="text-muted-foreground" />
                  )}
                </div>

                <Button
                  className="cursor-pointer"
                  onClick={() => handleImportClick(repo)}
                >
                  Import
                </Button>
              </div>
              {commitMessages[repo.name] && (
                <div className="mt-2 bg-gray-100 p-2 rounded">
                  <p className="font-semibold">Latest Commits:</p>
                  {/* Check if it's an array of arrays of strings */}
                  {Array.isArray(commitMessages[repo.name]) &&
                  Array.isArray(
                    (commitMessages[repo.name] as string[][])[0]
                  ) ? (
                    (commitMessages[repo.name] as string[][]).map(
                      (commitGroup: string[], groupIndex: number) => (
                        <div key={groupIndex} className="mb-4">
                          <ul className="list-disc ml-5 text-sm">
                            {commitGroup.map((msg: string, idx: number) => (
                              <li key={idx} className="mb-1">
                                {msg}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )
                  ) : (
                    <ul className="list-disc ml-5 text-sm">
                      {(commitMessages[repo.name] as string[]).map(
                        (msg, idx) => (
                          <li key={idx} className="mb-1">
                            {msg}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <li>No repositories found.</li>
      )}
    </div>
  );
}
