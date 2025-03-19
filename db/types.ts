export interface Repo {
  id?: string;
  user_id: string;
  github_id: number;
  name: string;
  owner: { login: string };
  html_url: string;
  created_at?: string | Date;
  private?: boolean;
}
