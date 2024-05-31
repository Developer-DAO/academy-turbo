import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { ConnectButton } from "@/components/ConnectButton";
import QuizCompletedModals from "@/components/mdx/QuizCompletedModals";
import { useAppContext } from "@/contexts/AppContext";

import Quiz from "./Quiz";

export interface QuizStatusCheckerType {
  quiz: string;
  successMessage: { message: string }[];
  successTitle: string;
  actionButton: any;
}

const QuizStatusChecker = ({
  quiz,
  successMessage,
  successTitle,
  actionButton,
}: QuizStatusCheckerType) => {
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const { address, isDisconnected } = useAccount();
  const { completedQuizzesIds, allLessonsData } = useAppContext();
  const [nextLessonURLPath, setNextLessonURLPath] = useState("");
  const [nextLessonTitle, setNextLessonTitle] = useState("");
  const [actualLessonTitle, setActualLessonTitle] = useState("");
  const [currentLessonPath, setCurrentLessonPath] = useState("");

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

      const newCurrentLessonPath: string = allLessonsData.find(
        (lesson) => lesson.quizFileName === quiz,
      )!.lessonPath;
      setCurrentLessonPath(newCurrentLessonPath);
    }
  }, [quizCompleted]);

  return isDisconnected || address === undefined ? (
    <div className="w-full content-center items-center justify-center text-center">
      <span className="font-future text-3xl font-bold text-[#721F79] underline">
        Connect your wallet and Sign in to start the quiz
      </span>
      <br />
      <br />
      <ConnectButton />
    </div>
  ) : quizCompleted ? (
    <>
      <QuizCompletedModals
        actionButton={actionButton}
        successMessage={successMessage}
        successTitle={successTitle}
        quizCompleted={quizCompleted}
        nextLessonURLPath={nextLessonURLPath}
        nextLessonTitle={nextLessonTitle}
        actualLessonTitle={actualLessonTitle}
        currentLessonPath={currentLessonPath}
      />
      {/* <Badge className="m-auto flex w-fit justify-center bg-green-600">
        <span className="text-2xl">Quiz Completed</span>
      </Badge> */}

      {/* {nextLessonURLPath !== "" ? (
        <Link href={nextLessonURLPath}>
          <ButtonRaw className="font-future w-fit rounded-3xl bg-[#44AF96] text-xs font-normal text-white lg:text-2xl">
            {`NOW TRY ${nextLessonTitle}`}
          </ButtonRaw>
        </Link>
      ) : null} */}
    </>
  ) : (
    <div className="w-full content-center items-center justify-center text-center">
      <span className="font-future text-3xl font-bold text-[#721F79] underline">
        Take the quiz to advance to the next lesson
      </span>
      <br />
      <br />
      <Quiz
        quiz={quiz}
        nextLessonURLPath={nextLessonURLPath}
        nextLessonTitle={nextLessonTitle}
        actualLessonTitle={actualLessonTitle}
      />
    </div>
  );
};

export default QuizStatusChecker;
