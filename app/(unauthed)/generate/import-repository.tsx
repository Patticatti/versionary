import Image from "next/image";
import GitHubRepos from "./github-repo-list";
export default function ImportRepository() {
  return (
    <div className="px-6 py-8 max-w-2xl w-full mx-auto">
      <h1 className="mb-4 text-4xl font-manrope tracking-tight font-bold">
        Import Git Repository
      </h1>
      <span className="mb-8 text-muted-foreground text-sm inline-flex gap-1">
        <p>Imported from </p>
        <strong className="font-medium text-foreground"> patticatti</strong>
        <Image
          src="/sponebob.webp"
          width={24}
          height={24}
          className="rounded-full w-6 h-6"
          alt="Avatar"
        />
      </span>
      <GitHubRepos />
    </div>
  );
}
