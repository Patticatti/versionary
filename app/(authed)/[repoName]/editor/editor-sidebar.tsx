"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Folder, Forward, File, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useZustandStore } from "@/state/zustandStore";

export default function EditorSidebar() {
  const { currentReleases, setCurrentReleases } = useZustandStore();
  // const projects = [
  //   {
  //     name: "2025-02-24.acacia",
  //     url: "2025-02-24.acacia",
  //     icon: File,
  //   },
  //   {
  //     name: "2025-02-16.acacia",
  //     url: "2025-02-16.acacia",
  //     icon: File,
  //   },
  //   {
  //     name: "2025-02-09.acacia",
  //     url: "2025-02-09.acacia",
  //     icon: File,
  //   },
  // ];
  const { isMobile } = useSidebar();
  const pathName = usePathname();
  const repoName = pathName.split("/")[1];
  return (
    <div className="h-full w-[240px] border-r border-neutral-200">
      <SidebarHeader className="px-5 border-b border-b-neutral-200 py-4 text-md font-semibold flex justify-between gap-4">
        Releases
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden p-3">
          <SidebarMenu>
            {currentReleases?.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={`/${repoName}/editor/${item.title}`}>
                    <File />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem>
                      <Folder className="text-muted-foreground" />
                      <span>View Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Forward className="text-muted-foreground" />
                      <span>Share Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Trash2 className="text-muted-foreground" />
                      <span>Delete Project</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarGroupLabel className="mt-4">February 2025</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
}
