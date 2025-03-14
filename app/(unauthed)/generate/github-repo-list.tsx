"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { RiGithubFill } from "react-icons/ri";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserRepos } from "@/utils/github/fetchRepos";

// Debounce helper function
const debounce = (func: Function, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

type Repo = {
  id: string;
  name: string;
  html_url: string;
  private: boolean;
};


export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>(repos);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

      <div className="bg-background divide-y divide-y-border rounded-lg overflow-hidden border">
        {/* Show skeleton loader while repos are being fetched */}
        {loading ? (
          <>
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
          </>
        ) : filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <Link
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 flex justify-between items-center"
            >
              <div className="flex items-center">
                <RiGithubFill size={32} />
                <p className="ml-4 text-sm font-medium mr-2">{repo.name}</p>
                {repo.private && (
                  <Lock size={16} className="text-muted-foreground" />
                )}
              </div>

              <Button className="cursor-pointer">Import</Button>
            </Link>
          ))
        ) : (
          <li>No repositories found.</li>
        )}
      </div>
    </div>
  );
}
