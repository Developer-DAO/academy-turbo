import type { Lessons, Tags,Tracks } from "database";
import { createContext, useContext } from "react";

import type { Fundamental, Project } from "@/interfaces";

type TagsResult =
  | Tracks
  | (Tracks &
      {
        tags: Tags[];
      }[]);

interface AppContextInterface {
  completedQuizzesIds: string[];
  projects: Project[];
  fundamentals: Fundamental[];
  allLessonsData: Lessons[];
  refetchCompletedQuizzesAll?: () => Promise<any>;
  allTracksData: TagsResult[];
}

export const AppContext = createContext<AppContextInterface>({
  completedQuizzesIds: [],
  projects: [],
  fundamentals: [],
  allLessonsData: [],
  refetchCompletedQuizzesAll: async () => Promise.resolve(),
  allTracksData: [],
});

AppContext.displayName = "AcademyAppContext";

// export const useAppContext = () => useContext(AppContext);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined || context === null) {
    throw new Error("useAppContext must be used within the AppContextProvider");
  }
  return context;
}
