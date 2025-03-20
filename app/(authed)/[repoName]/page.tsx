"use client";

import { useZustandStore } from "@/state/zustandStore";
import { redirect } from "next/navigation";

export default function Page() {
  const { repos } = useZustandStore();

  redirect(`/${repos[0].name}/dashboard`);
}
