import DashboardPage from "./dashboard";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

interface PageProps {
  params: { repo_name: string };
}

export default async function Page({ params }: PageProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
    return null;
  }

  return <DashboardPage user={user} repo_name={params.repo_name} />;
}
