"use client";

import { useState } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import { RiGithubFill } from "react-icons/ri";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useZustandStore } from "@/state/zustandStore";
import { useRouter } from "next/navigation";
import { Repo } from "@/db/types";

export function RepoSwitcher() {
  const { repos } = useZustandStore();
  const [activeRepo, setActiveRepo] = useState(repos[0]);
  const router = useRouter();
  if (!activeRepo) {
    return null;
  }

  const handleRepoChange = (repo: Repo) => {
    setActiveRepo(repo);
    router.push(`/${repo.name}/dashboard`);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <RiGithubFill className="size-5" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="ml-1 truncate font-medium">
                  {activeRepo.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={"bottom"}
            sideOffset={4}
          >
            {repos.map((repo, index) => (
              <DropdownMenuItem
                key={repo.name}
                onClick={() => handleRepoChange(repo)}
                className="gap-2 p-2 cursor-pointer"
              >
                <div className="flex size-6 items-center justify-center rounded-md">
                  <RiGithubFill className="size-5 shrink-0" />
                </div>
                {repo.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <Link href="/generate">
              <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add repository
                </div>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
