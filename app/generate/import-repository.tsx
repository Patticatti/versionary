import { RiNextjsFill } from "react-icons/ri";

export default function ImportRepository() {
  return (
    <main className="flex flex-col items-center p-4">
      <div className="p-6 border rounded-lg bg-background">
        <h1 className="mb-8 text-2xl font-manrope tracking-tight font-bold">
          Import Git Repository
        </h1>
        <div className="divide-y divide-y-border rounded-lg overflow-hidden border">
          <div className="bg-background p-4 flex items-center gap-4">
            <RiNextjsFill size={32} />
            <p className="text-sm font-medium">new-startup</p>
          </div>
          <div className="bg-background p-4 flex items-center gap-4">
            <RiNextjsFill size={32} />
            <p className="text-sm font-medium">new-startup</p>
          </div>
        </div>
      </div>
    </main>
  );
}
