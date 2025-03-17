"use client";
import GeneratePage from "./import-component";
import { useZustandStore } from "@/state/zustandStore";
import { redirect } from "next/navigation";

export default function Page() {
  const { user } = useZustandStore();
  if (!user) {
    redirect("/");
  }
  return (
    <div className="flex flex-1 bg-accent">
      <GeneratePage user={user} />
    </div>
  );
}
