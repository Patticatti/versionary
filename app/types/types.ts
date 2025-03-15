export interface Repo {
  id: string;
  name: string;
  html_url: string;
  private: boolean;
  owner: { login: string };
}
