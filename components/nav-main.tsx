"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { House, FilePenLine, Blocks, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavMain() {
  const items = [
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
  ];
  const pathName = usePathname();
  return (
    <SidebarGroup className="pt-6 px-3 group-has-data-[collapsible=icon]/sidebar-wrapper:px-2">
      <SidebarGroupLabel className="hidden">Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className={
                pathName === item.url
                  ? "text-[#1E64EC] hover:!text-[#1E64EC]"
                  : ""
              }
            >
              <Link href={item.url}>
                <item.icon />
                <span className="ps-1">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
