"use client";
import { useZustandStore } from "@/state/zustandStore";
import { redirect } from "next/navigation";

export default function Page() {
  const { repos } = useZustandStore();
  redirect(`/dashboard/${repos[0].name}`);
  return null;
}
