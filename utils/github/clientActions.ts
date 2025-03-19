"use client";

import { SetStateAction } from "react";
import { createClient } from "../supabase/client";

export default async function updateRepository({
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
  const supabase = createClient();
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

    alert("Repository updated!");
  } catch (error) {
    console.error("Error updating repository:", error);
  } finally {
    setLoading(false);
  }
}
