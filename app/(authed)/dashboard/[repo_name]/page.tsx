import { useZustandStore } from "@/state/zustandStore";
import DashboardPage from "./dashboard";
import { redirect } from "next/navigation";
export default async function Page({
  params,
}: {
  params: { repo_name: string };
}) {
  const { user } = useZustandStore();
  if (!user) {
    redirect("/");
  }
  const { repo_name } = params;

  return <DashboardPage user={user} repo_name={repo_name} />;
}
