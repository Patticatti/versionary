"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Release } from "@/db/types";
import { useZustandStore } from "@/state/zustandStore";
import { Badge } from "@/components/ui/badge";

export default function EditorPage() {
  const title = usePathname().split("/").pop();
  const { currentRepo, currentReleases } = useZustandStore();
  const [commitsData, setCommitsData] = useState<string | null>(null);
  const [currentRelease, setCurrentRelease] = useState<Release | null>(null);
  // const [changelogMarkdown, setChangelogMarkdown] = useState<string | null>(
  //   null
  // );
  interface Change {
    title: string;
    changes: string[];
  }

  interface JsonData {
    date: string;
    title: string;
    commitMessage: string;
    commitHash: string;
    changes: Change[];
    tags: string[];
  }
  const toDateString = (dateString: string) => {
    const date = new Date(dateString); // Parse the date string to a Date object
    return date.toLocaleDateString("en-US", {
      month: "long", // e.g., Jan
      day: "numeric", // e.g., 13
      year: "numeric", // e.g., 2025
    });
  };

  useEffect(() => {
    async function getCommits() {
      if (currentReleases?.length === 0 || currentReleases === null) return;
      if (title && currentRepo) {
        try {
          const filteredRelease = currentReleases.find(
            (release) => release.title === title
          );
          if (filteredRelease) {
            setCurrentRelease(filteredRelease);
            setCommitsData(filteredRelease.changelog_summary);
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
            console.error(
              "Release not found for title:",
              title,
              "current releases: ",
              currentReleases
            );
          }
        } catch (error) {
          console.error("Error fetching commits:", error);
        }
      }
    }

    getCommits();
  }, [title, currentRepo, currentReleases]);

  if (!commitsData) return <div>Loading..</div>;

  const jsonData: JsonData = JSON.parse(commitsData);

  return (
    <div className="flex flex-col flex-1 px-4 md:px-6 lg:px-8">
      <h1 className="mt-8 mb-12 text-center text-6xl font-manrope font-bold tracking-[-0.02em]">
        Changelog
      </h1>
      <div className="flex items-start">
        {currentRelease && (
          <p className="text-sm font-semibold text-muted-foreground pe-4">
            {toDateString(currentRelease.date_released)}
          </p>
        )}
        <span className="bg-teal-500 w-4 h-4 shrink-0 rounded-full border-4 border-teal-100 translate-x-1/2" />

        <div className="ps-8 pb-14 border-l space-y-4">
          <h2 className="mt-2 mb-8 text-2xl tracking-[-0.02em] font-manrope font-bold text-black leading-0">
            {currentRelease?.title}
          </h2>
          {/* Loop over each change section */}
          {jsonData.changes.map((change, index) => (
            <div key={index}>
              <h3 className="mb-2 text-md font-semibold font-manrope">
                {change.title}
              </h3>
              <ul className="text-sm pl-4 list-disc text-muted-foreground leading-[1.5em]">
                {change.changes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex items-center">
            {jsonData.tags &&
              jsonData.tags.map((tag, index) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="mr-2 text-xs py-1.5"
                >
                  {tag}
                </Badge>
              ))}
            <p className="px-4 text-xs">Product</p>
          </div>
        </div>
      </div>
    </div>
  );
}
