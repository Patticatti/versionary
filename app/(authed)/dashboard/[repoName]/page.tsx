import DashboardPage from "./dashboard";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Page({
  params,
}: {
  params: { repoName: string };
}) {
  const supabase = await createClient();
  const { repoName } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
    return null;
  }

  return <DashboardPage user={user} repoName={repoName} />;
}
