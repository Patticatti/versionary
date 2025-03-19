"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useZustandStore } from "@/state/zustandStore";

export default function AuthProvider() {
  const { setUser, setLoading, reset, setRepos } = useZustandStore(); // Add setRepositories state
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
        const { data: repositories, error } = await supabase
          .from("repositories") // Replace with your actual table name
          .select("*") // Select all columns, adjust if needed
          .eq("user_id", user.id); // Filter by user_id

        if (error) {
          console.error("Error fetching repositories:", error.message);
        } else {
          setRepos(repositories); // Store repositories in Zustand
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

  return null;
}
