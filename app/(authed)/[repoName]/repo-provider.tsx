"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getRepoByName } from "@/utils/github/actions";
import { useZustandStore } from "@/state/zustandStore";
import { usePathname } from "next/navigation";
import { Repo } from "@/db/types";
interface RepoContextType {
  currentRepo: Repo | null;
  loading: boolean;
}

// Create the context with the defined type
const RepoContext = createContext<RepoContextType | undefined>(undefined);

export const useRepo = () => useContext(RepoContext);

export const RepoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, currentRepo, setCurrentRepo } = useZustandStore();
  const [loading, setLoading] = useState<boolean>(true);
  const pathName = usePathname();
  const repoName = pathName.split("/")[1];

  useEffect(() => {
    const fetchCurrentRepo = async () => {
      setLoading(true);
      try {
        const data = await getRepoByName(
          user?.user_metadata.user_name,
          repoName
        );
        setCurrentRepo(data);
      } catch (error) {
        console.error("Error fetching repository:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchCurrentRepo();
  }, [user?.user_metadata.user_name, repoName]);

  return (
    <RepoContext.Provider value={{ currentRepo, loading }}>
      {children}
    </RepoContext.Provider>
  );
};
