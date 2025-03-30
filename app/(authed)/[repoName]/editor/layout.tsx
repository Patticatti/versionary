import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-separator";
import { ExternalLink, GitBranch } from "lucide-react";
import EditorSidebar from "./editor-sidebar";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-h-screen overflow-hidden">
      <header className="sticky-0 top-0 border-b border-neutral-200 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="w-full flex items-center justify-between gap-2 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 group-has-data-[collapsible=icon]/sidebar-wrapper:flex hidden opacity-60" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 w-[1px] bg-neutral-300 group-has-data-[collapsible=icon]/sidebar-wrapper:flex hidden"
            />

            <Select>
              <SelectTrigger className="w-[110px] cursor-pointer">
                <div className="flex gap-2.5 items-center">
                  <GitBranch size={18} />
                  <SelectValue placeholder="main" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Branches</SelectLabel>
                  <SelectItem value="main">main</SelectItem>
                  <SelectItem value="dev">dev</SelectItem>
                  <SelectItem value="prod">prod</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button className="">
            View Changelog <ExternalLink className="size-4" />
          </Button>
        </div>
      </header>
      <div className="h-full flex gap-4 pt-0 overflow-hidden">
        <EditorSidebar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
