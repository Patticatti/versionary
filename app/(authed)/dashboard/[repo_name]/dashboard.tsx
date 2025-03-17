"use client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { getRepoByName } from "@/utils/github/actions";

export default function DashboardPage({
  user,
  repo_name,
}: {
  user: User;
  repo_name: string;
}) {
  const [repoData, setRepoData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRepo() {
      try {
        const data = await getRepoByName(
          user.user_metadata.user_name,
          repo_name
        );
        setRepoData(data);
      } catch (error) {
        console.error("Error fetching repository:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepo();
  }, [user.user_metadata.user_name, repo_name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user.user_metadata.full_name} and {repo_name} and {repoData?.id}
    </div>
  );
}
