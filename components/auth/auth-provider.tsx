"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useZustandStore } from "@/state/zustandStore";
import { redirect } from "next/navigation";
import { fetchGroupedCommits } from "@/utils/github/actions";
import { updateRelease } from "@/utils/github/clientActions";
import { generateChangelogSummary } from "@/utils/chatgpt/actions";
// import { redirect } from "next/navigation";

export default function AuthProvider() {
  const {
    setUser,
    setLoading,
    reset,
    setRepos,
    currentRepo,
    setCurrentReleases,
  } = useZustandStore(); // Add setRepositories state
  const supabase = createClient();

  useEffect(() => {
    const fetchUserAndRepositories = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);

        // Fetch repositories for this user
        const { data: repositories } = await supabase
          .from("repositories") // Replace with your actual table name
          .select("*") // Select all columns, adjust if needed
          .eq("user_id", user.id); // Filter by user_id

        if (repositories?.length === 0 || repositories === null) {
          redirect("/generate");
        } else {
          setRepos(repositories);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserAndRepositories();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          if (session.provider_token) {
            window.localStorage.setItem(
              "oauth_provider_token",
              session.provider_token
            );
          }
          if (session.provider_refresh_token) {
            window.localStorage.setItem(
              "oauth_provider_refresh_token",
              session.provider_refresh_token
            );
          }

          setUser(session.user);
        }

        if (event === "SIGNED_OUT") {
          window.localStorage.removeItem("oauth_provider_token");
          window.localStorage.removeItem("oauth_provider_refresh_token");
          reset();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser, setLoading, reset, setRepos, supabase]);

  useEffect(() => {
    const checkAndUpdateReleases = async () => {
      if (!currentRepo || !currentRepo.owner?.login) return;
      console.log(currentRepo);
      // Fetch existing releases for the repository
      const { data: existingReleases, error } = await supabase
        .from("releases")
        .select("*")
        .eq("repo_name", currentRepo.name)
        .order("date_released", { ascending: false });

      if (error) {
        console.error("Error fetching releases:", error);
        return;
      }
      setCurrentReleases(existingReleases || []);

      const existingReleaseTitles = new Set(
        existingReleases?.map((release) => release.title)
      );

      // Fetch new releases
      const newReleases = await fetchGroupedCommits(
        currentRepo.owner.login.toLowerCase(),
        currentRepo.name
      );

      // Filter out releases that already exist
      const releasesToUpdate = newReleases.filter(
        (release) => !existingReleaseTitles.has(release.title)
      );

      if (releasesToUpdate.length > 0 && !currentRepo.auto_update) {
        console.log(`Updating ${releasesToUpdate.length} new releases...`);

        // Call updateRelease for each new release
        await Promise.all(
          releasesToUpdate.map(async (release) => {
            if (!release.changelog_summary) {
              console.log(
                `Changelog summary missing for release: ${release.title}, generating one...`
              );
              const commitsData =
                `title: ${release.title}\n date: ${release.date_released}\n` +
                release.commits
                  .map((commit) => `${commit.commit_message}`)
                  .join("\n");
              console.log(commitsData);
              const changelogSummary = await generateChangelogSummary(
                commitsData
              );
              release.changelog_summary = changelogSummary;
            }
            updateRelease({
              ...release,
              setLoading: setLoading,
            });
          })
        );
        console.log("Releases updated successfully!");
      }
    };

    checkAndUpdateReleases();
  }, [currentRepo]);

  return null;
}
