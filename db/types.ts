export interface Repo {
  id?: string;
  user_id: string;
  github_id: number;
  name: string;
  owner: { login: string };
  html_url: string;
  created_at?: string | Date;
  private?: boolean;
  auto_update: boolean;
}

export interface Commit {
  commit_hash: string;
  commit_message: string;
  date: string;
  author: string;
}

export interface Release {
  repo_name: string;
  title: string;
  date_released: string;
  branch: string;
  commit_author: string;
  commit_hash: string;
  commit_message: string;
  commits: Commit[];
  changelog_summary: string | null;
}
