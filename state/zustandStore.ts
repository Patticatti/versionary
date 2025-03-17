import { Repo } from "@/db/types";
import { create } from "zustand";
import { User } from "@supabase/supabase-js";

interface AuthedState {
  repos: Repo[];
  user?: User;
  setRepos: (r: Repo[]) => void;
  setUser: (u: User) => void;
  reset: () => void;
}

export const useZustandStore = create<AuthedState>((set, get) => ({
  repos: [],
  setUser: (u: User) => {
    set((state) => ({
      user: u,
    }));
  },
  setRepos: (r) => {
    set((state) => ({
      repos: r,
    }));
  },
  reset: () => {
    set({
      user: undefined,
      repos: [],
    });
  },
}));
