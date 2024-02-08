import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMemo, useState } from "react";
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
  // Requests
  useMemo(() => {
    if (allLessonsData.length && completedQuizzesIds.length) {
      const actualLessonId: string = allLessonsData.find(
        (lesson) => lesson.quizFileName === quiz,
      )!.id;

      if (actualLessonId === undefined) return;

      if (completedQuizzesIds.includes(actualLessonId)) {
        setQuizCompleted(true);
        const actualLessonNextPath: string = allLessonsData.find(
          (lesson) => lesson.quizFileName === quiz,
        )!.nextLessonPath!;
        setNextLessonURLPath(actualLessonNextPath);
        const newNextLessonTitle: string = allLessonsData.find(
          (lesson) => lesson.quizFileName === quiz,
        )!.lessonTitle;
        setNextLessonTitle(newNextLessonTitle);
      }
    }
  }, [allLessonsData, completedQuizzesIds, quiz]);

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
        <ButtonRaw className="font-future w-32 rounded-3xl bg-[#44AF96] text-xs font-normal text-white">
          {`NOW TRY ${nextLessonTitle}`}
        </ButtonRaw>
      ) : null}
    </>
  ) : (
    <Quiz quiz={quiz} />
  );
};

export default QuizStatusChecker;
