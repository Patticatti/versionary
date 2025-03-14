"use client";

import { useEffect, useState } from "react";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  private: boolean;
};

export default function GitHubRepoList() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/api/github/repos");
        if (!res.ok) throw new Error("Failed to fetch repositories");
        const data = await res.json();
        setRepos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>GitHub Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name} {repo.private ? "(Private)" : "(Public)"}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
