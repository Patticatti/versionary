import { RiNextjsFill, RiReactjsFill } from "react-icons/ri";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function ImportRepository() {
  return (
    <main className="h-full flex flex-col items-center p-4">
      <div className="px-6 py-8 max-w-2xl w-full">
        <h1 className="mb-4 text-4xl font-manrope tracking-tight font-bold">
          Import Git Repository
        </h1>
        <span className="mb-8 text-muted-foreground text-sm inline-flex gap-1">
          <p>Imported from </p>
          <strong className="font-medium text-foreground"> patticatti</strong>
          <Image
            src="/sponebob.webp"
            width={24}
            height={24}
            className="rounded-full w-6 h-6"
            alt="Avatar"
          />
        </span>
        <div className="bg-background divide-y divide-y-border rounded-lg overflow-hidden border">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <RiNextjsFill size={32} />
              <p className="ml-4 text-sm font-medium mr-2">new-startup</p>
              <Lock size={16} className="text-muted-foreground" />
            </div>

            <Button className="cursor-pointer">Import</Button>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <RiReactjsFill size={32} className="text-[#61DAFB]" />
              <p className="ml-4 text-sm font-medium mr-2">baby-repo</p>
              <Lock size={16} className="text-muted-foreground" />
            </div>

            <Button className="cursor-pointer">Import</Button>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <RiNextjsFill size={32} />
              <p className="ml-4 text-sm font-medium mr-2">new-startup</p>
              <Lock size={16} className="text-muted-foreground" />
            </div>

            <Button className="cursor-pointer">Import</Button>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <RiNextjsFill size={32} />
              <p className="ml-4 text-sm font-medium mr-2">new-startup</p>
              <Lock size={16} className="text-muted-foreground" />
            </div>

            <Button className="cursor-pointer">Import</Button>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <RiNextjsFill size={32} />
              <p className="ml-4 text-sm font-medium mr-2">new-startup</p>
              <Lock size={16} className="text-muted-foreground" />
            </div>

            <Button className="cursor-pointer">Import</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
