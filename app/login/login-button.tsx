"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LoginButton() {
  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "repo read:org", // Explicitly set scopes
      },
    });

    if (error) console.error("Login failed:", error);
  };

  return <button onClick={signInWithGitHub}>Sign in with GitHub</button>;
}
