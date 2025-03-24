"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { RotateCcw, ExternalLink } from "lucide-react";
import { RiGithubFill } from "react-icons/ri";
import DeploymentSection from "./deployment-section";
import ReleasesList from "./releases-list";
import { usePathname } from "next/navigation";
import { useZustandStore } from "@/state/zustandStore";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, currentRepo, loading } = useZustandStore();
  const pathName = usePathname();
  const repoName = pathName.split("/")[1];

  return (
    <>
      <DashboardHeader repoName={repoName} isPrivate={currentRepo?.private} />
      <div className="flex bg-muted/50 flex-1 flex-col items-center gap-4 pt-0">
        <div className="py-6 px-4 md:px-6 lg:px-8 w-full max-w-screen-xl">
          {/* <h1 className="py-6 font-manrope font-bold text-xl md:text-2xl lg:text-3xl tracking-[-0.02em]">
            Project Overview
          </h1> */}
          {loading ? (
            // Show skeletons while loading
            <>
              <Skeleton className="h-72 w-full mb-4" />
              <h2 className="pt-9 pb-4 font-manrope font-bold text-xl md:text-2xl lg:text-3xl tracking-[-0.02em]">
                Releases
              </h2>
              <Skeleton className="h-24 w-2/3" />
              <Skeleton className="mt-24 h-8 w-2/3" />
            </>
          ) : (
            <>
              <DeploymentSection />
              <h2 className="pt-9 pb-4 font-manrope font-bold text-xl md:text-2xl lg:text-3xl tracking-[-0.02em]">
                Releases
              </h2>
              <ReleasesList
                repoOwner={user?.user_metadata.user_name}
                repoName={repoName}
              />
            </>
          )}
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
      {/* {!loading && (
        <div>
          {user?.user_metadata.full_name} and {repoName} and {currentRepo?.id}
        </div>
      )} */}
    </>
  );
}
function DashboardHeader({
  repoName,
  isPrivate,
}: {
  repoName: string;
  isPrivate: boolean | undefined;
}) {
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
          {isPrivate ? "Private" : "Public"}
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
        <Link href="/editor">
          <Button className="!px-5 !rounded-md">
            Visit
            <ExternalLink className="size-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
