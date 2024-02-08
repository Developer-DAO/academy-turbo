import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Badge, ButtonRaw, Container } from "ui";
import { useAccount } from "wagmi";

import { useAppContext } from "@/contexts/AppContext";

import Quiz from "./Quiz";

export interface QuizStatusCheckerTye {
  quiz: string;
}

const QuizStatusChecker = ({ quiz }: QuizStatusCheckerTye) => {
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const { address, isDisconnected } = useAccount();
  const { completedQuizzesIds, allLessonsData } = useAppContext();
  const [nextLessonURLPath, setNextLessonURLPath] = useState("");
  const [nextLessonTitle, setNextLessonTitle] = useState("");
  const [actualLessonTitle, setActualLessonTitle] = useState("");
  useEffect(() => {
    setQuizCompleted(true);
  }, []);
  // Requests
  useMemo(() => {
    if (allLessonsData.length && completedQuizzesIds.length) {
      const actualLessonId: string = allLessonsData.find(
        (lesson) => lesson.quizFileName === quiz,
      )!.id;

      if (actualLessonId === undefined) return;

      if (completedQuizzesIds.includes(actualLessonId)) {
        setQuizCompleted(true);
      }
    }
  }, [allLessonsData, completedQuizzesIds, quiz]);

  useEffect(() => {
    if (quizCompleted) {
      const newNextLessonURLPath: string = allLessonsData.find(
        (lesson) => lesson.quizFileName === quiz,
      )!.nextLessonPath!;
      setNextLessonURLPath(newNextLessonURLPath);
      const newNextLessonTitle: string = allLessonsData.find(
        (lesson) => lesson.nextLessonPath === newNextLessonURLPath,
      )!.lessonTitle;
      setNextLessonTitle(newNextLessonTitle);

      const newActualLessonTitle: string = allLessonsData.find(
        (lesson) => lesson.quizFileName === quiz,
      )!.lessonTitle;
      setActualLessonTitle(newActualLessonTitle);
    }
  }, [quizCompleted]);

  return isDisconnected || address === undefined ? (
    <>
      <Container>
        <span className="font-future text-3xl font-bold text-[#721F79] underline">
          Connect your wallet and Sign in to start the quiz
        </span>
      </Container>
      <br />
      <Container>
        <ConnectButton accountStatus="address" showBalance={false} chainStatus="none" />
      </Container>
    </>
  ) : quizCompleted ? (
    <>
      <Badge className="m-auto flex w-fit justify-center bg-green-600">
        <span className="text-2xl">Quiz Completed</span>
      </Badge>

      {nextLessonURLPath !== "" ? (
        <NextLink href={nextLessonURLPath}>
          <ButtonRaw className="font-future w-32 rounded-3xl bg-[#44AF96] text-xs font-normal text-white">
            {`NOW TRY ${nextLessonTitle}`}
          </ButtonRaw>
        </NextLink>
      ) : null}
    </>
  ) : (
    <Quiz
      quiz={quiz}
      nextLessonURLPath={nextLessonURLPath}
      nextLessonTitle={nextLessonTitle}
      actualLessonTitle={actualLessonTitle}
      quizCompleted={quizCompleted}
    />
  );
};

export default QuizStatusChecker;
