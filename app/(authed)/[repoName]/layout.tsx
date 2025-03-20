import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { RepoProvider } from "./repo-provider";

export default async function DashboardPage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RepoProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </RepoProvider>
  );
}
