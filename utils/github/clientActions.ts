"use client";

import { SetStateAction } from "react";
import { createClient } from "../supabase/client";
import { useZustandStore } from "@/state/zustandStore";

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
  const { setRepos, repos } = useZustandStore();
  return new Promise<void>(async (resolve, reject) => {
    const supabase = createClient();
    setLoading(true);

    try {
      const repositoryData = {
        user_id,
        github_id,
        name,
        owner: { login: owner },
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

      setRepos([...repos, repositoryData]);

      resolve();
    } catch (error) {
      console.error("Error updating repository:", error);
      reject(error);
    } finally {
      setLoading(false);
    }
  });
}
