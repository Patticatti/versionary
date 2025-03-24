"use client";
import React, { useEffect, useState } from "react";
import { useZustandStore } from "@/state/zustandStore";
import { Badge } from "@/components/ui/badge";

export default function EditorPage() {
  const { currentRepo, currentReleases } = useZustandStore();
  const [releases, setReleases] = useState<JsonData[]>([]); // Store all releases
  // const [changelogMarkdown, setChangelogMarkdown] = useState<string | null>(null);

  interface Change {
    title: string;
    changes: string[];
  }

  interface JsonData {
    date: string;
    title: string;
    commitMessage?: string;
    commitHash?: string;
    changes: Change[];
    tags: string[];
  }

  const toDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    async function getCommits() {
      if (!currentReleases?.length) return;

      try {
        // Loop through all releases instead of filtering by title
        const releaseData: JsonData[] = [];

        for (const release of currentReleases) {
          if (release.changelog_summary) {
            const releaseJsonData = JSON.parse(release.changelog_summary);
            releaseData.push(releaseJsonData);
            setReleases(releaseData);
          }
        }
        // Use first release as default
      } catch (error) {
        console.error("Error fetching commits:", error);
      }
    }

    getCommits();
  }, [currentRepo, currentReleases]);

  if (!releases) return <div>Loading..</div>;
  return (
    <div className="flex max-h-full flex-col flex-1 px-4 md:px-6 lg:px-8 overflow-y-scroll">
      <h1 className="mt-8 mb-12 text-center text-6xl font-manrope font-bold tracking-[-0.02em]">
        Changelog
      </h1>

      {releases.map((release, idx) => (
        <div key={release.title} className="flex items-start">
          <p className="min-w-36 text-sm font-semibold text-muted-foreground">
            {toDateString(release.date)}
          </p>
          <span className="bg-teal-500 w-4 h-4 shrink-0 rounded-full border-4 border-teal-100 translate-x-1/2" />
          <div key={idx} className="ps-8 pb-14 border-l space-y-4">
            <h2 className="mt-2 mb-8 text-2xl tracking-[-0.02em] font-manrope font-bold text-black leading-0">
              {release.title}
            </h2>

            {/* Loop over each change section */}
            {release.changes.map((change, index) => (
              <div key={index} className="mb-6">
                <h3 className="mb-2 text-md font-semibold font-manrope">
                  {change.title}
                </h3>
                <ul className="text-sm pl-4 list-disc text-foreground opacity-80 leading-[1.5em] space-y-1">
                  {change.changes.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex items-center">
              {release.tags &&
                release.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="mr-2 text-xs py-1.5"
                  >
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
