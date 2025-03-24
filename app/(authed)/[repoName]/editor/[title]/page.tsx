"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Release, Commit } from "@/db/types";
import { useZustandStore } from "@/state/zustandStore";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

export default function EditorPage() {
  const title = usePathname().split("/").pop();
  const { currentRepo, currentReleases } = useZustandStore();
  const [commitsData, setCommitsData] = useState<Commit[] | null>(null);
  // const [changelogMarkdown, setChangelogMarkdown] = useState<string | null>(
  //   null
  // );

  useEffect(() => {
    async function getCommits() {
      if (title && currentRepo && currentReleases) {
        try {
          const filteredRelease = currentReleases.find(
            (release) => release.title === title
          );
          if (filteredRelease) {
            setCommitsData(filteredRelease.commits);
            // const commit_messages = filteredRelease.commits
            //   .map((commit) => commit.commit_message)
            //   .join("\n");

            // const prompt = `Generate a changelog from this. Give it a title that summarizes all the changes made. Divide these commits into categories with bullet points. Try to aim for 3-5 categories: \n${commit_messages}`;

            // // Call your API that interacts with ChatGPT (or use OpenAI's API directly)
            // const response = await fetch("/api/chatgpt", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({ prompt }),
            // });

            // if (response.ok) {
            //   const data = await response.json();
            //   setChangelogMarkdown(data.summarizedChangelog);
            // } else {
            //   console.error(
            //     "Error summarizing changelog:",
            //     response.statusText
            //   );
            // }
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

  if (!commitsData) return <div>Loading..</div>;

  return (
    <div>
      <h1>{title}</h1>
      <div>
        {commitsData.map((commit) => (
          <div key={commit.commit_hash}>
            <h3>{commit.commit_message}</h3>
            {/* <p>Author: {commit.author}</p>
            <p>Date: {commit.date}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
