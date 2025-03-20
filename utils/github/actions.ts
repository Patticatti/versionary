import { Repo, Commit, Release } from "@/db/types";

const timeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (secondsAgo < 60) return `${secondsAgo}s ago`;
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`;
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`;
  if (secondsAgo < 604800) return `${Math.floor(secondsAgo / 86400)}d ago`;
  return date.toDateString();
};

export async function getRepoByName(owner: string, repoName: string) {
  const accessToken = window.localStorage.getItem("oauth_provider_token");
  if (!accessToken) {
    throw new Error("User not authenticated or no access token.");
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(
      `Error fetching data: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  return data || null;
}

export async function fetchGroupedCommits(
  owner: string,
  repo: string
): Promise<Release[]> {
  const accessToken = window.localStorage.getItem("oauth_provider_token");
  if (!accessToken) {
    throw new Error("User not authenticated or no access token.");
  }

  let allCommits: Commit[] = [];
  let page = 1;
  const perPage = 100; // GitHub allows up to 100 per request

  while (true) {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const commits = await response.json();
    if (commits.length === 0) break; // Stop when no more commits are found
    const formattedCommits: Commit[] = commits.map((commit: any) => ({
      commitHash: commit.sha.substring(0, 7),
      commitMessage: commit.commit.message,
      date: commit.commit.author.date,
      author: commit.commit.author.name,
    }));
    allCommits.push(...formattedCommits);
    page++;
  }
  const releases: Release[] = [];
  // No need to reverse, just chunk into groups of 30
  for (let i = 0; i < allCommits.length; i += 30) {
    const batch = allCommits.slice(i, i + 30);
    if (batch.length === 0) continue;

    const latestCommit = batch[0]; // The latest commit is the first one in the batch
    releases.push({
      title: `${latestCommit.date.split("T")[0]}.${latestCommit.commitHash}`,
      dateReleased: `${timeAgo(latestCommit.date)} by ${latestCommit.author}`,
      branch: "main", // Assuming "main", but this may need to be fetched separately
      commitHash: latestCommit.commitHash,
      commitMessage: latestCommit.commitMessage,
      commits: batch, // Store all commits in this release
    });
  }

  return releases;
}

export async function fetchCommitMessagesRange(owner: string, repo: string) {
  const accessToken = window.localStorage.getItem("oauth_provider_token");
  if (!accessToken) {
    throw new Error("User not authenticated or no access token.");
  }

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const since = oneWeekAgo.toISOString();

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=20&since=${since}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Required for private repos
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const commits = await response.json();
  return commits.map((commit: any) => commit.commit.message);
}

export async function fetchCommitMessages(owner: string, repo: string) {
  const accessToken = window.localStorage.getItem("oauth_provider_token");
  if (!accessToken) {
    throw new Error("User not authenticated or no access token.");
  }
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Optional if accessing private repos
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const commits = await response.json();
  console.log(`Fetched ${commits.length} commits`);
  return commits.map((commit: any) => commit.commit.message);
}

export async function fetchGroupedRepos(perPage: number): Promise<Repo[]> {
  const accessToken = window.localStorage.getItem("oauth_provider_token");
  if (!accessToken) {
    throw new Error("User not authenticated or no access token.");
  }

  let allRepos: Repo[] = [];
  let page = 1;

  while (true) {
    const response = await fetch(
      `https://api.github.com/user/repos?visibility=all&sort=updated&direction=desc&per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: Repo[] = await response.json();
    if (repos.length === 0) break;

    allRepos.push(...repos);
    page++;
  }

  return allRepos;
}
