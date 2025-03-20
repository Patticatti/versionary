"use client";

import { useZustandStore } from "@/state/zustandStore";
import { redirect } from "next/navigation";

export default function Page({
  params,
}: {
  params: {
    repoName: string;
    path?: string[];
  };
}) {
  const { repos, user } = useZustandStore();

  if (!user) {
    redirect("/");
  }

  const pathAfterRepo = params.path ? params.path.join("/") : "";
  console.log("Path after repo:", pathAfterRepo);
  if (!pathAfterRepo) {
    redirect(`/${repos[0].name}/dashboard`);
  }

  return (
    <div>
      <p>Repo: {params.repoName}</p>
      <p>Path: {pathAfterRepo}</p>
    </div>
  );
}
