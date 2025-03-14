import { NextResponse } from "next/server";

export async function GET() {
  const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
  const GITHUB_API_URL = "https://api.github.com/user/repos";

  if (!GITHUB_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "GitHub token is missing" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }

    const repos = await response.json();
    return NextResponse.json(repos, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
