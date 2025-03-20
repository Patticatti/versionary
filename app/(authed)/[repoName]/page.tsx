"use client";

import { useZustandStore } from "@/state/zustandStore";
import { redirect } from "next/navigation";

export default function Page({
  params,
}: {
  params: {
    repoName: string;
  };
}) {
  const { repos, user } = useZustandStore();

  if (!user) {
    redirect("/");
  } else redirect(`/${repos[0].name}/dashboard`);
}
