"use client";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AuthProvider() {
  useEffect(() => {
    const supabase = createClient();

    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.provider_token) {
        window.localStorage.setItem(
          "oauth_provider_token",
          session.provider_token
        );
      }

      if (session?.provider_refresh_token) {
        window.localStorage.setItem(
          "oauth_provider_refresh_token",
          session.provider_refresh_token
        );
      }

      if (event === "SIGNED_OUT") {
        window.localStorage.removeItem("oauth_provider_token");
        window.localStorage.removeItem("oauth_provider_refresh_token");
      }
    });
  }, []);

  return null;
}
