"use client";
import { useEffect, useState } from "react";
import { fetchUserRepos } from "@/utils/github/fetchRepos";
// Component to display GitHub repositories
export default function GitHubRepos() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const fetchedRepos = await fetchUserRepos();
      setRepos(fetchedRepos);
    };

    fetchRepos();
  }, []);

  return (
    <div>
      <h1>User's GitHub Repositories</h1>
      <ul>
        {repos.length > 0 ? (
          repos.map((repo: any) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))
        ) : (
          <li>No repositories found.</li>
        )}
      </ul>
    </div>
  );
}
