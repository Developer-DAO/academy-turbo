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
  // const [formattedAllTracksData, setFormattedAllTracksData] = useState<TrackWithTags>([]);

  const { data: sessionData, status: sessionStatus } = useSession();
  const { address, status: walletStatus } = useAccount();

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

  // const fetchFromDirs = async () => {
  //   const lessonsData = await fetch("/api/readfiles").then(async (res) => res.json());

  //   const lessonsFormatResult: FormatedLessonInterface = lessonsData.reduce(
  //     (acc: any, curr: any) => {
  //       if (acc[curr.path] === undefined) acc[curr.path] = [];

  //       acc[curr.path].push(curr);
  //       return acc as Project | Fundamental;
  //     },
  //     {},
  //   );

  //   setFundamentals(lessonsFormatResult.fundamentals);
  //   setProjects(lessonsFormatResult.projects);
  // };

  // useEffect(() => {
  //   void fetchFromDirs();
  // }, []);

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

  // useEffect(() => {
  //   if (
  //     allLessonsData !== undefined &&
  //     projects !== undefined &&
  //     completedQuizzesIds.length !== 0
  //   ) {
  //     const projectsWithCompleteStatus = projects.map((lesson) => {
  //       const currentLessonId = allLessonsData.find(
  //         (lessonData: any) =>
  //           lessonData.projectLessonNumber?.toString() === lesson.slug.toString(), // DEV_NOTE: forcing .toString() to avoid type errors
  //       )?.id;

  //       const completed =
  //         currentLessonId !== undefined && completedQuizzesIds.includes(currentLessonId)
  //           ? true
  //           : false; // DEV_NOTE: if the lesson is not found, it is not completed
  //       return { ...lesson, completed };
  //     });

  //     setProjects(projectsWithCompleteStatus);
  //   } else if (
  //     allLessonsData !== undefined &&
  //     projects !== undefined &&
  //     completedQuizzesIds.length === 0
  //   ) {
  //     const projectsWithCompleteStatus = projects.map((lesson) => {
  //       return { ...lesson, completed: false };
  //     });
  //     setProjects(projectsWithCompleteStatus);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [completedQuizzesIds]);

  // useEffect(() => {
  //   if (
  //     allLessonsData !== undefined &&
  //     fundamentals !== undefined &&
  //     completedQuizzesIds.length !== 0
  //   ) {
  //     const fundamentalsWithCompleteStatus = fundamentals.map((lesson) => {
  //       const currentLessonId = allLessonsData.find(
  //         (lessonData: any) =>
  //           lessonData.fundamentalLessonName?.toString() === lesson.slug.toString(), // DEV_NOTE: forcing .toString() to avoid type errors
  //       )?.id;

  //       const completed =
  //         currentLessonId !== undefined && completedQuizzesIds.includes(currentLessonId)
  //           ? true
  //           : false; // DEV_NOTE: if the lesson is not found, it is not completed
  //       return { ...lesson, completed };
  //     });

  //     setFundamentals(fundamentalsWithCompleteStatus);
  //   } else if (
  //     allLessonsData !== undefined &&
  //     fundamentals !== undefined &&
  //     completedQuizzesIds.length === 0
  //   ) {
  //     const fundamentalsWithCompleteStatus = fundamentals.map((lesson) => {
  //       return { ...lesson, completed: false };
  //     });
  //     setFundamentals(fundamentalsWithCompleteStatus);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [completedQuizzesIds]);

  return (
    <AppContext.Provider
      value={{
        completedQuizzesIds,
        allTracksData: allTracksData !== undefined ? allTracksData : [],
        allTracksDataIsLoading,
        allLessonsData: allLessonsData !== undefined ? allLessonsData : [],
        allLessonsDataIsLoading,
        refetchCompletedQuizzesAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
