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
