"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchGroupedCommits } from "@/utils/github/actions";
import { Release, Commit } from "@/db/types";
import { useZustandStore } from "@/state/zustandStore";

export default function EditorPage() {
  const title = usePathname().split("/").pop();
  const { currentRepo } = useZustandStore();
  const [commitsData, setCommitsData] = useState<Commit[] | null>(null);

  useEffect(() => {
    async function getCommits() {
      if (title && currentRepo) {
        try {
          const data: Release[] = await fetchGroupedCommits(
            currentRepo.owner.login,
            currentRepo.name
          ); // Pass actual repoOwner and repoName
          const filteredRelease = data.find(
            (release) => release.title === title
          );
          if (filteredRelease) {
            setCommitsData(filteredRelease.commits); // Get the commits from the release
          } else {
            console.error("Release not found for title:", title);
          }
        } catch (error) {
          console.error("Error fetching commits:", error);
        }
      }
    }

    getCommits();
  }, [title, currentRepo]);

  if (!commitsData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{title + "pop"}</h1>
      <div>
        {commitsData.map((commit) => (
          <div key={commit.commitHash}>
            <h3>{commit.commitMessage}</h3>
            {/* <p>Author: {commit.author}</p>
            <p>Date: {commit.date}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
