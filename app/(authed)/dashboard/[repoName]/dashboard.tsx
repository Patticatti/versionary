"use client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { getRepoByName } from "@/utils/github/actions";
import { Repo } from "@/db/types";

export default function DashboardPage({
  user,
  repoName,
}: {
  user: User;
  repoName: string;
}) {
  const [repoData, setRepoData] = useState<Repo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRepo() {
      try {
        const data = await getRepoByName(
          user.user_metadata.user_name,
          repoName
        );
        setRepoData(data);
      } catch (error) {
        console.error("Error fetching repository:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepo();
  }, [user.user_metadata.user_name, repoName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user.user_metadata.full_name} and {repoName} and {repoData?.id}
    </div>
  );
}
