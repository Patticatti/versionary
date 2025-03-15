import { GitBranch } from "lucide-react";
import EditorSidebar from "./editor-sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default function EditorPage() {
  return (
    <>
      <header className="border-b border-neutral-200 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 group-has-data-[collapsible=icon]/sidebar-wrapper:flex hidden opacity-60" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 w-[1px] bg-neutral-300 group-has-data-[collapsible=icon]/sidebar-wrapper:flex hidden"
          />

          <Select>
            <SelectTrigger className="w-[110px]">
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
      </header>
      <div className="flex flex-1 flex-col gap-4 pt-0">
        <EditorSidebar />
      </div>
    </>
  );
}
