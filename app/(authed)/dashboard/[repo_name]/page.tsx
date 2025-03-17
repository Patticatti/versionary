import { createClient } from "@/utils/supabase/server";
import DashboardPage from "./dashboard";
import { redirect } from "next/navigation";
export default async function Page({
  params,
}: {
  params: { repo_name: string };
}): Promise<JSX.Element> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/");
  }
  const { repo_name } = params;

  return <DashboardPage user={user} repo_name={repo_name} />;
}
