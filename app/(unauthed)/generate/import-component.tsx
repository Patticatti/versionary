import Image from "next/image";
import GitHubRepos from "./github-repo-list";
import { User } from "@supabase/supabase-js";

export default function GeneratePage({ user }: { user: User }) {
  return (
    <div className="px-6 py-8 max-w-2xl w-full mx-auto">
      <h1 className="mb-4 text-4xl font-manrope tracking-tight font-bold">
        Import Git Repository
      </h1>
      <span className="mb-8 font-normal text-muted-foreground text-sm inline-flex gap-1">
        <p>Imported from </p>
        <strong className="font-mono font-normal text-foreground">
          {user?.user_metadata.preferred_username}
        </strong>
        <Image
          src={user?.user_metadata.avatar_url || "/sponebob.webp"}
          width={20}
          height={20}
          className="rounded-full w-5 h-5"
          alt="Avatar"
        />
      </span>
      <GitHubRepos />
    </div>
  );
}
