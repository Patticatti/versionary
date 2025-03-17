"use client";
import * as React from "react";
// import { useState } from "react";
import {
  AudioWaveform,
  Command,
  File,
  House,
  FilePenLine,
  Blocks,
  GalleryVerticalEnd,
  Settings,
} from "lucide-react";
// import { createClient } from "@/utils/supabase/client";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { User } from "@supabase/supabase-js";
import { useCallback } from "react";
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "my-startup",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "sigma",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "cool-site",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Project Overview",
      url: "/dashboard",
      icon: House,
    },
    {
      title: "Editor",
      url: "/editor",
      icon: FilePenLine,
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: Blocks,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "2025-02-24.acacia",
      url: "#",
      icon: File,
    },
    {
      name: "2025-02-16.acacia",
      url: "#",
      icon: File,
    },
    {
      name: "2025-02-09.acacia",
      url: "#",
      icon: File,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex justify-between gap-4">
        <TeamSwitcher teams={data.teams} />
        <SidebarTrigger className="-ml-1 opacity-60" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
