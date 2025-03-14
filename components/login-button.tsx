"use client";

import { Button } from "@/components/ui/button";
import { IoLogoGithub } from "react-icons/io";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
export default function LoginButton() {
  const supabase = createClient();

  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "repo read:org", // Explicitly set OAuth scopes
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error("GitHub OAuth Error:", error);
      return;
    }

    if (data.url) {
      const redirectToGenerate = `${process.env.NEXT_PUBLIC_SITE_URL}/generate`;
      console.log("Redirecting to GitHub for OAuth flow: ", data.url);
      window.location.href = `${data.url}&redirect_to=${encodeURIComponent(
        redirectToGenerate
      )}`;
    }
  };

  useEffect(() => {
    // Listen for the auth state change and store tokens in localStorage
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        if (session.provider_token) {
          // Store the provider token and refresh token in localStorage
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
      }

      if (event === "SIGNED_OUT") {
        // Clear tokens on logout
        window.localStorage.removeItem("oauth_provider_token");
        window.localStorage.removeItem("oauth_provider_refresh_token");
      }
    });
  }, [supabase]);
  return (
    <form action={signInWithGitHub}>
      <Button
        type="submit"
        className="relative text-lg p-6 !pe-6 gap-3 cursor-pointer w-full lg:w-fit"
      >
        <IoLogoGithub className="!w-6 !h-6 text-background" />
        Sign In with Github
      </Button>
    </form>
  );
}
