import { createContext, useContext } from "react";

import type { Fundamental, Project } from "@/interfaces";

interface AppContextInterface {
  completedQuizzesIds: string[];
  projects: Project[];
  fundamentals: Fundamental[];
  allLessonsData: any[];
  refetchCompletedQuizzesAll?: () => Promise<any>;
}

export const AppContext = createContext<AppContextInterface>({
  completedQuizzesIds: [],
  projects: [],
  fundamentals: [],
  allLessonsData: [],
  refetchCompletedQuizzesAll: async () => Promise.resolve(),
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
