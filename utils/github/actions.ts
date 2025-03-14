export async function fetchGroupedCommits(owner: string, repo: string) {
  const accessToken = window.localStorage.getItem("oauth_provider_token");
  if (!accessToken) {
    throw new Error("User not authenticated or no access token.");
  }

  let allCommits: string[] = [];
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

    allCommits.push(...commits.map((commit: any) => commit.commit.message));
    page++;
  }

  // No need to reverse, just chunk into groups of 30
  const groupedCommits: string[][] = [];
  for (let i = 0; i < allCommits.length; i += 30) {
    groupedCommits.push(allCommits.slice(i, i + 30));
  }

  return groupedCommits;
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

export async function fetchUserRepos() {
  const accessToken = window.localStorage.getItem("oauth_provider_token");
  if (!accessToken) {
    throw new Error("User not authenticated or no access token.");
  }

  const response = await fetch(
    "https://api.github.com/user/repos?visibility=all",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories from GitHub.");
  }

  const repos = await response.json();
  return repos; // List of repositories
}
