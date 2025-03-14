import { RiNextjsFill, RiReactjsFill } from "react-icons/ri";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ImportRepository() {
  return (
    <main className="flex flex-col items-center p-4">
      <div className="p-6 border rounded-lg bg-background max-w-2xl w-full">
        <h1 className="mb-8 text-2xl font-manrope tracking-tight font-bold">
          Import Git Repository
        </h1>
        <div className="bg-background divide-y divide-y-border rounded-lg overflow-hidden border">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <RiNextjsFill size={32} />
              <p className="ml-4 text-sm font-medium mr-2">new-startup</p>
              <Lock size={16} className="text-muted-foreground" />
            </div>

            <Button>Import</Button>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <RiReactjsFill size={32} className="text-[#61DAFB]" />
              <p className="ml-4 text-sm font-medium mr-2">new-startup</p>
              <Lock size={16} className="text-muted-foreground" />
            </div>

            <Button>Import</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
