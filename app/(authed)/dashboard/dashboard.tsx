import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { RiGithubFill } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { RefreshCcw } from "lucide-react";
import { User } from "@supabase/supabase-js";
import DeploymentSection from "./deployment-section";
import ReleasesList from "./releases-list";

export default function DashboardPage({ user }: { user: User }) {
  return (
    <>
      <header className="bg-muted/50 border-b flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center px-4">
          <SidebarTrigger className="-ml-1 group-has-data-[collapsible=icon]/sidebar-wrapper:flex hidden opacity-60" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 w-[1px] bg-neutral-300 group-has-data-[collapsible=icon]/sidebar-wrapper:flex hidden"
          />
          <RiGithubFill className="size-8 rounded-full" />
          <p className="ml-3 font-manrope text-md text-foreground font-bold tracking-[-0.02em]">
            new-startup
          </p>
          <Badge
            variant="outline"
            className="ml-2 bg-background font-normal text-muted-foreground rounded-full"
          >
            Private
          </Badge>
        </div>
      </header>
      <div className="flex bg-muted/50 flex-1 flex-col items-center gap-4 pt-0">
        <div className="py-6 px-4 md:px-6 lg:px-8 w-full">
          {/* <h1 className="py-6 font-manrope font-bold text-xl md:text-2xl lg:text-3xl tracking-[-0.02em]">
            Project Overview
          </h1> */}
          <DeploymentSection />
          <h2 className="pt-9 pb-3 font-manrope font-bold text-xl md:text-2xl lg:text-3xl tracking-[-0.02em]">
            Releases
          </h2>
          <span className="mb-6 font-normal text-muted-foreground text-sm inline-flex gap-1">
            <RefreshCcw className="size-4 -rotate-40 mr-2" />
            <p>Continuously generated </p>
            <strong className="font-normal text-foreground">
              every week
            </strong>{" "}
            from
            <strong className="font-normal text-foreground font-mono">
              {user.user_metadata.preferred_username}/new-startup
            </strong>
            <Image
              src={user.user_metadata.avatar_url || "/sponebob.webp"}
              width={20}
              height={20}
              className="rounded-full w-5 h-5"
              alt="Avatar"
            />
          </span>
          <ReleasesList />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </>
  );
}
