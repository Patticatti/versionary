import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { RiGithubFill } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, GitBranch, GitCommitHorizontal } from "lucide-react";

export default function DashboardPage() {
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
          <Badge variant="outline" className="ml-2 font-normal rounded-full">
            Private
          </Badge>
        </div>
      </header>
      <div className="flex bg-muted/50 flex-1 flex-col items-center gap-4 pt-0">
        <div className="p-4 w-full max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-6 bg-background rounded-xl border p-6 overflow-hidden">
            <Image
              src="/preview-changelog.png"
              width={700}
              height={400}
              className="object-top object-cover w-full lg:w-[443px] h-[296px] lg:max-w-1/2 rounded-lg border-4"
              alt="Changelog Preview"
            />
            <div className="flex flex-col gap-5 min-w-0 overflow-hidden">
              <div>
                <div className="font-normal text-muted-foreground text-sm mb-1">
                  Deployment
                </div>
                <Button
                  variant="link"
                  className="p-0 h-fit flex items-center gap-2 text-foreground font-semibold text-sm"
                >
                  <p>new-startup-app.versionary.dev</p>
                  <span className="bg-teal-500 w-4 h-4 shrink-0 rounded-full border-4 border-teal-100" />
                </Button>
              </div>
              <div>
                <div className="font-normal text-muted-foreground text-sm mb-1">
                  Last Updated
                </div>
                <Button
                  variant="link"
                  className="p-0 h-fit flex items-center gap-2 text-foreground text-sm"
                >
                  <p className="font-normal">2h ago by the-sigma-gamer</p>
                  <span className="bg-teal-500 w-4 h-4 shrink-0 rounded-full border-4 border-teal-100" />
                </Button>
              </div>
              <div>
                <div className="font-normal text-muted-foreground text-sm mb-1">
                  Domain
                </div>
                <Button
                  variant="link"
                  className="!px-0 py-0 h-fit flex items-center gap-2 text-foreground font-semibold text-sm"
                >
                  <p>www.patticatti.com/changelog</p>
                  <ExternalLink className="size-4 shrink-0" />
                </Button>
              </div>
              <div>
                <div className="font-normal text-muted-foreground text-sm mb-2">
                  Source
                </div>
                <div className="space-y-2 mt-1">
                  <Button
                    variant="link"
                    className=" !px-0 py-0 h-fit flex items-center gap-3 text-foreground font-semibold text-sm"
                  >
                    <GitBranch className="size-4 shrink-0 opacity-70" />
                    <p className="font-mono font-normal">main</p>
                  </Button>
                  <Button
                    variant="link"
                    className="!justify-star w-full !px-0 py-0 h-fit flex font-normal items-center gap-3 text-foreground max-w-sm text-sm"
                  >
                    <GitCommitHorizontal className=" size-4 shrink-0 opacity-70" />
                    <p className="font-mono">8f5a489</p>
                    <p className="truncate ">
                      Merge pull request #8 from
                      Patticatti/patti/add-signin-modal
                    </p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </>
  );
}
