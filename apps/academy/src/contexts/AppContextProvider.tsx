import { useSession } from "next-auth/react";
import { type ReactNode, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import type { CompletedQuizRecord } from "@/interfaces";
import { api } from "@/utils/api";

import { AppContext } from "./AppContext";

interface PropsInterface {
  children: ReactNode;
}

export function AppContextProvider({ children }: PropsInterface) {
  const [completedQuizzesIds, setCompletedQuizzesIds] = useState<string[]>([]);
  const [sessionDataUser, setSessionDataUser] = useState<any>(null);

  const { data: sessionData, status: sessionStatus } = useSession();
  const { address, status: walletStatus } = useAccount();
  const [learnersAmmountToShow, setLearnersAmmountToShow] = useState("");

  useEffect(() => {
    if (sessionData?.user && sessionData.user !== sessionDataUser) {
      setSessionDataUser(sessionData.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData]);

  const {
    data: completedQuizzesAllData,
    // isLoading: completedQuizzesAllIsLoading,
    refetch: refetchCompletedQuizzesAll,
  } = api.completedQuizzes.all.useQuery(
    undefined, // no input
    {
      // Disable request if no session data
      enabled: sessionDataUser !== null && address !== undefined,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (walletStatus === "disconnected" || sessionStatus === "unauthenticated") {
      setSessionDataUser(null);
      setCompletedQuizzesIds([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStatus, walletStatus]);

  useEffect(() => {
    if (completedQuizzesAllData !== undefined && completedQuizzesAllData.length > 0) {
      const completedIds: string[] = completedQuizzesAllData.map(
        (completedQuiz: CompletedQuizRecord) => completedQuiz.lessonId,
      );
      if (completedIds !== completedQuizzesIds) setCompletedQuizzesIds(completedIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedQuizzesAllData]);

  // - Get All Tracks data
  const { data: allTracksData, isLoading: allTracksDataIsLoading } = api.tracks.getAll.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    },
  );

  // - Get All lessons data
  const { data: allLessonsData, isLoading: allLessonsDataIsLoading } = api.lessons.getAll.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    },
  );

  const { data: allAccountsData, isLoading: allAccountsDataIsLoading } =
    api.account.getAll.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    if (allAccountsData !== undefined && !allAccountsDataIsLoading) {
      const accountsLength = allAccountsData.length;
      let stringToShow = `+${accountsLength}`;
      if (accountsLength % 10 === 0) {
        const firstNumber = accountsLength.toString().split("")[0]!;
        stringToShow = `+${firstNumber}0`;
      }
      setLearnersAmmountToShow(stringToShow);
    }
  }, [allAccountsData, allAccountsDataIsLoading]);

  return (
    <AppContext.Provider
      value={{
        completedQuizzesIds,
        allTracksData: allTracksData !== undefined ? allTracksData : [],
        allTracksDataIsLoading,
        allLessonsData: allLessonsData !== undefined ? allLessonsData : [],
        allLessonsDataIsLoading,
        refetchCompletedQuizzesAll,
        learnersAmmountToShow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
