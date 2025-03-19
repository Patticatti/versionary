import { Repo } from "@/db/types";
import { create } from "zustand";
import { User } from "@supabase/supabase-js";

interface AuthedState {
  repos: Repo[];
  user?: User;
  loading: boolean;
  setRepos: (r: Repo[]) => void;
  setUser: (u: User) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useZustandStore = create<AuthedState>((set, get) => ({
  repos: [],
  loading: true,
  setUser: (u: User) => {
    set((state) => ({
      user: u,
      loading: false,
    }));
  },
  setRepos: (r) => {
    set((state) => ({
      repos: r,
      loading: false,
    }));
  },
  setLoading: (loading) => set({ loading }),
  reset: () => {
    set({
      user: undefined,
      repos: [],
      loading: false,
    });
  },
}));
