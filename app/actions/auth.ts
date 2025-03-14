"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function getUserProfile() {
  const supabase = await createClient();

  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError || !session) {
    return null;
  }

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  return user;
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
}

export async function signInWithGitHub() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      scopes: "repo read:org", // Explicitly set OAuth scopes
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error("GitHub OAuth Error:", error);
    redirect("/error");
  }

  if (data.url) {
    console.log("data url is" + data.url);
    redirect(data.url);
  }
}
