import { SetStateAction } from "react";
import { createClient } from "../supabase/client";

export default async function updateRepository({
  github_id,
  user_id,
  name,
  owner,
  html_url,
  data,
  setLoading,
}: {
  github_id: number;
  user_id: string;
  name: string;
  owner: string;
  html_url: string;
  data: any; // Optional field for GitHub API response data
  setLoading: (value: SetStateAction<boolean>) => void;
}) {
  const supabase = createClient();
  try {
    setLoading(true);

    const repositoryData = {
      user_id,
      github_id,
      name,
      owner,
      html_url,
      data,
      updated_at: new Date().toISOString(),
    };
    const { error: updateError } = await supabase
      .from("repositories")
      .upsert([repositoryData], { onConflict: "github_id" });

    if (updateError) throw updateError;

    alert("Repository updated!");
  } catch (error) {
    console.error("Error updating repository:", error);
  } finally {
    setLoading(false);
  }
}
