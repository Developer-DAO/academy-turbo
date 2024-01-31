import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMemo, useState } from "react";
import { Badge, Container } from "ui";
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

  // Requests
  useMemo(() => {
    if (allLessonsData.length && completedQuizzesIds.length) {
      const actualLessonId: string = allLessonsData.find(
        (lesson) => lesson.quizFileName === `${quiz}.json`,
      )!.id;

      if (actualLessonId === undefined) return;

      if (completedQuizzesIds.includes(actualLessonId)) {
        setQuizCompleted(true);
      }
    }
  }, [allLessonsData, completedQuizzesIds, quiz]);

  return isDisconnected || address === undefined ? (
    <>
      <Container>
        <span className="text-3xl font-bold text-yellow-300 underline">
          Connect your wallet and Sign in to start the quiz
        </span>
      </Container>
      <br />
      <Container>
        <ConnectButton accountStatus="address" showBalance={false} chainStatus="none" />
      </Container>
    </>
  ) : quizCompleted ? (
    <Badge className="m-auto flex w-fit justify-center bg-green-600">
      <span className="text-2xl">Quiz Completed</span>
    </Badge>
  ) : (
    <Quiz quiz={quiz} />
  );
};

export default QuizStatusChecker;
