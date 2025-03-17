import DashboardPage from "./dashboard";
import { redirect } from "next/navigation";
import { useZustandStore } from "@/state/zustandStore";

export default async function Page() {
  const { user } = useZustandStore();
  if (!user) {
    redirect("/");
  }
  return <DashboardPage user={user} />;
}
