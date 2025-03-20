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

// export interface Commit {
//   sha: string;
//   commit: {
//     author: {
//       name: string;
//       email: string;
//     };
//     name: string;
//     email: string;
//     date: string;
//     message: string;
//   };
//   author?: {
//     login: string;
//   };
//   committer?: {
//     login: string;
//   };
// }

export interface Commit {
  commitHash: string;
  commitMessage: string;
  date: string;
  author: string;
}

export interface Release {
  title: string;
  dateReleased: string;
  branch: string;
  commitHash: string;
  commitMessage: string;
  commits: Commit[];
}
