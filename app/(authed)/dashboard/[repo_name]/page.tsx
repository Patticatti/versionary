import DashboardPage from "./dashboard";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Page({
  params,
}: {
  params: { repo_name: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
    return null;
  }
  const { repo_name } = params;

  return <DashboardPage user={user} repo_name={repo_name} />;
}
