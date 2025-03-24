"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  GitBranch,
  GitCommitHorizontal,
  EllipsisVertical,
  File,
  RefreshCcw,
} from "lucide-react";
import Image from "next/image";
import { useZustandStore } from "@/state/zustandStore";
import { Release } from "@/db/types";

const timeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString); // Parse the date string to a Date object
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (secondsAgo < 60) return `${secondsAgo}s ago`; // Less than 60 seconds
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`; // Less than 1 hour
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`; // Less than 1 day
  if (secondsAgo < 604800) return `${Math.floor(secondsAgo / 86400)}d ago`; // Less than 1 week

  // For older dates (1 week or more), format as "Mon Jan 13, 2025"
  return date.toLocaleDateString("en-US", {
    weekday: "short", // e.g., Mon
    month: "short", // e.g., Jan
    day: "numeric", // e.g., 13
    year: "numeric", // e.g., 2025
  });
};

function ReleaseCard({
  title,
  date_released,
  branch,
  commit_author,
  commit_hash,
  commit_message,
  repoName,
}: Release & { repoName: string }) {
  const dateAgo = timeAgo(date_released);
  return (
    <div className="flex items-center gap-2 px-5 py-4 border-b last:border-none">
      <div className="flex gap-2 min-w-1/3">
        <File className="size-4 shrink-0 mr-1 text-muted-foreground" />
        <div className="overflow-hidden mr-8">
          <Link
            href={`/${repoName}/editor/${title}`}
            className="text-md font-semibold tracking-tight leading-[1em] cursor-pointer"
          >
            {title}
          </Link>
          <p className="mt-2 text-sm text-muted-foreground truncate">
            {dateAgo} by {commit_author}
          </p>
        </div>
      </div>
      <div className="w-full space-y-2 mt-1">
        <Button
          variant="link"
          className="!px-0 py-0 h-fit flex items-center gap-3 text-foreground font-semibold text-sm"
        >
          <GitBranch className="size-4 shrink-0 opacity-70" />
          <p className="font-mono font-normal">{branch}</p>
        </Button>
        <Button
          variant="link"
          className="!justify-start w-full !px-0 py-0 h-fit flex font-normal items-center gap-3 text-foreground max-w-xs text-sm"
        >
          <GitCommitHorizontal className="size-4 shrink-0 opacity-70" />
          <p className="font-mono">{commit_hash}</p>
          <p className="truncate">{commit_message}</p>
        </Button>
      </div>

      <EllipsisVertical className="size-6 shrink-0" />
    </div>
  );
}

export default function ReleasesList({
  repoOwner,
  repoName,
}: {
  repoOwner: string;
  repoName: string;
}) {
  const { user, currentReleases } = useZustandStore();

  return (
    <>
      <span className="mb-4 font-normal text-muted-foreground text-sm inline-flex gap-1">
        <RefreshCcw className="size-4 -rotate-40 mr-2" />
        <p>Continuously generated </p>
        <strong className="font-normal text-foreground">every week</strong> from
        <strong className="font-normal text-foreground font-mono">
          {user?.user_metadata.preferred_username}/new-startup
        </strong>
        <Image
          src={user?.user_metadata.avatar_url || "/sponebob.webp"}
          width={20}
          height={20}
          className="rounded-full w-5 h-5"
          alt="Avatar"
        />
      </span>
      <div className="bg-background border rounded-xl">
        {currentReleases?.map((release) => (
          <ReleaseCard
            key={release.commit_hash}
            {...release}
            repoName={repoName}
          />
        ))}
      </div>
    </>
  );
}
