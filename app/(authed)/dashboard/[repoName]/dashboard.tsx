"use client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { getRepoByName } from "@/utils/github/actions";
import { Repo } from "@/db/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { RotateCcw, ExternalLink } from "lucide-react";
import { RiGithubFill } from "react-icons/ri";
import DeploymentSection from "../deployment-section";
import ReleasesList from "../releases-list";
// import { useZustandStore } from "@/state/zustandStore";

export default function DashboardPage({
  user,
  repoName,
}: {
  user: User;
  repoName: string;
}) {
  const [repoData, setRepoData] = useState<Repo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRepo() {
      try {
        const data = await getRepoByName(
          user.user_metadata.user_name,
          repoName
        );
        setRepoData(data);
      } catch (error) {
        console.error("Error fetching repository:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepo();
  }, [user.user_metadata.user_name, repoName]);

  return (
    <>
      <DashboardHeader repoName={repoName} />
      <div className="flex bg-muted/50 flex-1 flex-col items-center gap-4 pt-0">
        <div className="py-6 px-4 md:px-6 lg:px-8 w-full max-w-screen-xl">
          {/* <h1 className="py-6 font-manrope font-bold text-xl md:text-2xl lg:text-3xl tracking-[-0.02em]">
            Project Overview
          </h1> */}
          <DeploymentSection />
          <h2 className="pt-9 pb-4 font-manrope font-bold text-xl md:text-2xl lg:text-3xl tracking-[-0.02em]">
            Releases
          </h2>
          <ReleasesList />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
      <div>
        {user.user_metadata.full_name} and {repoName} and {repoData?.id}
      </div>
    </>
  );
}
function DashboardHeader({ repoName }: { repoName: string }) {
  return (
    <header className="bg-muted/50 border-b flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center px-4">
        <SidebarTrigger className="-ml-1 group-has-data-[collapsible=icon]/sidebar-wrapper:flex hidden opacity-60" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 w-[1px] bg-neutral-300 group-has-data-[collapsible=icon]/sidebar-wrapper:flex hidden"
        />
        <RiGithubFill className="size-8 rounded-full" />
        <p className="ml-3 font-manrope text-md text-foreground font-bold tracking-[-0.02em]">
          {repoName}
        </p>
        <Badge
          variant="outline"
          className="ml-2 bg-background font-normal text-muted-foreground rounded-full"
        >
          Private
        </Badge>
      </div>
      <div className="flex items-center gap-2 px-4">
        <Button variant="ghost" className="!px-5 !rounded-md">
          <RotateCcw className="size-4" />
          Update
        </Button>
        <Button variant="outline" className="!px-5 !rounded-md">
          <RiGithubFill className="size-5" />
          Repository
        </Button>
        <Button className="!px-5 !rounded-md">
          Visit
          <ExternalLink className="size-4" />
        </Button>
      </div>
    </header>
  );
}
