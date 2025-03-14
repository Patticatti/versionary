"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signInWithGitHub() {
  const supabase = await createClient();
  const redirectTo =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/auth/callback"
      : `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      scopes: "repo read:org",
      redirectTo,
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
