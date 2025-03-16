import { Button } from "@/components/ui/button";
import {
  GitBranch,
  GitCommitHorizontal,
  EllipsisVertical,
  File,
} from "lucide-react";

interface Release {
  title: string;
  dateReleased: string;
  branch: string;
  commitHash: string;
  commitMessage: string;
}

const releases: Release[] = [
  {
    title: "2025-02-24.acacia",
    dateReleased: "4h ago by the-sigma-gamer",
    branch: "main",
    commitHash: "8f5a489",
    commitMessage:
      "Merge pull request #8 from Patticatti/patti/add-signin-modal",
  },
  {
    title: "2025-02-20.baobab",
    dateReleased: "1d ago by dev_master",
    branch: "dev",
    commitHash: "a1c2d3e",
    commitMessage: "Fix issue #12 - improve button styling",
  },
  {
    title: "2025-02-15.cedar",
    dateReleased: "3d ago by coderX",
    branch: "feature/auth",
    commitHash: "5f7b9d1",
    commitMessage: "Implement OAuth login with GitHub",
  },
  {
    title: "2025-02-10.dogwood",
    dateReleased: "1w ago by anotherDev",
    branch: "hotfix",
    commitHash: "3e4a5b6",
    commitMessage: "Hotfix: resolve login issue for Safari users",
  },
  {
    title: "2025-02-05.elm",
    dateReleased: "2w ago by frontend_wizard",
    branch: "ui-updates",
    commitHash: "d8f9e0a",
    commitMessage: "Refactor UI components for better accessibility",
  },
];

function ReleaseCard({
  title,
  dateReleased,
  branch,
  commitHash,
  commitMessage,
}: Release) {
  return (
    <div className="flex justify-between items-center gap-2 px-5 py-4 border-b">
      <div className="flex gap-2 w-1/3">
        <File className="size-4 shrink-0 mr-1 text-muted-foreground" />
        <div className="overflow-hidden">
          <p className="text-md font-semibold tracking-tight leading-[1em]">
            {title}
          </p>
          <p className="mt-2 text-sm text-muted-foreground truncate">
            {dateReleased}
          </p>
        </div>
      </div>

      <div className="space-y-2 mt-1">
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
          <p className="font-mono">{commitHash}</p>
          <p className="truncate">{commitMessage}</p>
        </Button>
      </div>
      <EllipsisVertical className="size-6 shrink-0" />
    </div>
  );
}

export default function ReleasesList() {
  return (
    <div className="bg-background border rounded-xl">
      {releases.map((release) => (
        <ReleaseCard key={release.commitHash} {...release} />
      ))}
    </div>
  );
}
