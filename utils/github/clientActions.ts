"use client";

import { SetStateAction, useState, useCallback } from "react";
import { createClient } from "../supabase/client";
import { Release } from "@/db/types";
// import { fetchGroupedCommits } from "./actions";
// import { generateChangelogSummary } from "../chatgpt/actions";
// import { useZustandStore } from "@/state/zustandStore";

// export const useReleaseUpdates = (currentRepo: Repo) => {
//   const { currentReleases, setCurrentReleases, loading, setLoading } =
//     useZustandStore();
//   const supabase = createClient();

//   const checkAndUpdateReleases = useCallback(async () => {
//     if (!currentRepo || !currentRepo.owner?.login) return;

//     try {
//       setLoading(true);

//       // Fetch existing releases
//       const { data: existingReleases, error } = await supabase
//         .from("releases")
//         .select("*")
//         .eq("repo_name", currentRepo.name)
//         .order("date_released", { ascending: false });

//       if (error) throw error;

//       setCurrentReleases(existingReleases || []);

//       const existingReleaseTitles = new Set(
//         existingReleases?.map((release) => release.title)
//       );

//       // Fetch new releases
//       const newReleases = await fetchGroupedCommits(
//         currentRepo.owner.login.toLowerCase(),
//         currentRepo.name
//       );

//       // Filter out releases that already exist
//       const releasesToUpdate = newReleases.filter(
//         (release) => !existingReleaseTitles.has(release.title)
//       );

//       // Only update if auto-update is off and there are new releases
//       if (releasesToUpdate.length > 0 && !currentRepo.auto_update) {
//         await Promise.all(
//           releasesToUpdate.map(async (release) => {
//             // Generate changelog if missing
//             if (!release.changelog_summary) {
//               const commitsData =
//                 `title: ${release.title}\n date: ${release.date_released}\n` +
//                 release.commits
//                   .map((commit) => `${commit.commit_message}`)
//                   .join("\n");

//               release.changelog_summary = await generateChangelogSummary(
//                 commitsData
//               );
//             }

//             await updateRelease({
//               ...release,
//               setLoading,
//             });
//           })
//         );
//       }
//       return releasesToUpdate;
//     } catch (error) {
//       console.error("Error checking releases:", error);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   }, [currentRepo]);

//   return {
//     currentReleases,
//     checkAndUpdateReleases,
//     loading,
//   };
// };

export default function updateRepository({
  github_id,
  user_id,
  name,
  owner,
  html_url,
  setLoading,
}: {
  github_id: number;
  user_id: string;
  name: string;
  owner: string;
  html_url: string;
  setLoading: (value: SetStateAction<boolean>) => void;
}) {
  return new Promise<void>(async (resolve, reject) => {
    const supabase = createClient();
    console.log;
    setLoading(true);

    try {
      const repositoryData = {
        user_id,
        github_id,
        name,
        owner,
        html_url,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("repositories")
        .upsert([repositoryData], { onConflict: "github_id" });

      if (error) {
        console.error("Supabase error:", error.message);

        throw new Error(error.message);
      }

      resolve();
    } catch (error) {
      console.error("Error updating repository:", error);
      reject(error);
    } finally {
      setLoading(false);
    }
  });
}

export function updateRelease({
  repo_name,
  title,
  date_released,
  branch,
  commit_author,
  commit_hash,
  commit_message,
  commits,
  changelog_summary,
  setLoading,
}: Release & { setLoading: (value: boolean) => void }) {
  return new Promise<void>(async (resolve, reject) => {
    const supabase = createClient();
    setLoading(true);
    try {
      const releaseData = {
        repo_name,
        title,
        date_released,
        branch,
        commit_author,
        commit_hash,
        commit_message,
        commits,
        changelog_summary,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("releases")
        .upsert([releaseData], { onConflict: "title" });

      if (error) {
        console.error("Supabase error:", error.message);

        throw new Error(error.message);
      }

      resolve();
    } catch (error) {
      console.error("Error updating repository:", error);
      reject(error);
    } finally {
      setLoading(false);
    }
  });
}
