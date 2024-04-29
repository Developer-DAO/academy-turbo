import type { Lessons, Tracks } from "database";
import { createContext, useContext } from "react";

interface AppContextInterface {
  completedQuizzesIds: string[];
  allLessonsData: Lessons[];
  allLessonsDataIsLoading: boolean;
  refetchCompletedQuizzesAll?: () => Promise<any>;
  allTracksData: Tracks[]; // | (Tracks[] & { tags: Tags[] });
  allTracksDataIsLoading: boolean;
  learnersAmmountToShow: string;
}

export const AppContext = createContext<AppContextInterface>({
  completedQuizzesIds: [],
  allLessonsData: [],
  allLessonsDataIsLoading: false,
  refetchCompletedQuizzesAll: async () => Promise.resolve(),
  allTracksData: [],
  allTracksDataIsLoading: false,
  learnersAmmountToShow: "",
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
