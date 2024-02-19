// import Image from "next/image";
// import NextLink from "next/link";
import React, { useState } from "react";
import {
  ButtonRaw,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  useToast,
} from "ui";

import Spinner from "@/components/Spinner";
import { useAppContext } from "@/contexts/AppContext";
import { api } from "@/utils/api";
import { getCorrectAnswersIndexes, haveSameElements } from "@/utils/QuizHelpers";
export interface QuizProps {
  quiz: string;
  nextLessonURLPath: string;
  nextLessonTitle: string;
  actualLessonTitle: string;
}

interface Quiz {
  title: string;
  questions: [
    {
      question: string;
      options: [
        {
          answer: string;
          correct?: boolean;
        },
      ];
    },
  ];
}

export type Answers = Record<string, number[]>;

const Quiz = (props: QuizProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const quiz: Quiz = require(`@/data/quizzes/${props.quiz}.json`);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [_correctAnswers, setCorrectAnswers] = useState<number[] | null>(null);

  const { toast } = useToast();
  const { refetchCompletedQuizzesAll, allLessonsData } = useAppContext();

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const previousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const previousButtonVisibility = () => {
    return currentQuestionIndex === 0 ? "hidden" : "visible";
  };

  const nextButtonVisibility = () => {
    return currentQuestionIndex + 1 == quiz.questions.length ? "hidden" : "visible";
  };

  // .map((option) => option)

  // const getQuestionBackground = (optionIndex: number) => {
  //   if (
  //     correctAnswers !== null &&
  //     correctAnswers !== undefined &&
  //     correctAnswers.includes(currentQuestionIndex) &&
  //     quiz.questions[currentQuestionIndex]?.options[optionIndex]?.correct !== undefined &&
  //     quiz.questions[currentQuestionIndex]?.options[optionIndex]?.correct === true &&
  //     answers[currentQuestionIndex]?.includes(optionIndex) === true
  //   ) {
  //     return "green.500";
  //   }

  //   return "gray.600";
  // };

  const quizNotAnswered = () => {
    toast({
      title: "Quiz not answered",
      description: "Please answer all the questions",
      duration: 9000,
    });
  };

  const quizFailedToast = (wrongAnswersCounter: number) => {
    toast({
      title: "Quiz failed",
      description: `You have ${wrongAnswersCounter} wrong answers :(`,
      variant: "destructive",
      duration: 9000,
    });
  };

  // - Add
  const { mutate: quizzesAddMutate, isLoading: quizzesAddIsLoading } =
    api.completedQuizzes.add.useMutation({
      onSuccess: async () => {
        refetchCompletedQuizzesAll && (await refetchCompletedQuizzesAll());
        quizSuccessToast();
        cancelQuiz();
      },
    });

  const quizSuccessToast = () => {
    // cancelQuiz();
    toast({
      title: "Amazing!",
      description: "You have passed the lesson!",
      duration: 9000,
    });
  };

  const submit = () => {
    if (quiz.questions.length != Object.keys(answers).length) {
      quizNotAnswered();
      return;
    }

    let wrongAnswersCounter = 0;

    const newCorrectAnswers: number[] = [];

    quiz.questions.forEach((question, index) => {
      const correctAnswersIndexes = getCorrectAnswersIndexes(question);

      if (!haveSameElements(answers[index]!, correctAnswersIndexes)) {
        wrongAnswersCounter++;
        return;
      }

      newCorrectAnswers.push(index);
    });

    setCorrectAnswers(newCorrectAnswers);

    if (wrongAnswersCounter >= 1) {
      quizFailedToast(wrongAnswersCounter);
      return;
    }

    // return quizSuccessToast();

    const lessonIdToSave: string = allLessonsData.find(
      (lesson) => lesson.quizFileName === props.quiz,
    )!.id;

    if (lessonIdToSave === undefined || lessonIdToSave === "") {
      console.error("Lesson not found");
      return;
    }

    quizzesAddMutate({
      lessonId: lessonIdToSave,
    });
  };

  const cancelQuiz = () => {
    setAnswers({});
    // setShowQuiz(false);
    setCorrectAnswers(null);
    setCurrentQuestionIndex(0);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers: Answers = { ...answers };

    if (
      newAnswers !== undefined &&
      Object.keys(newAnswers).length > 0 &&
      currentQuestionIndex !== undefined &&
      newAnswers[currentQuestionIndex] !== undefined &&
      newAnswers[currentQuestionIndex]!.length > 0 &&
      newAnswers[currentQuestionIndex]!.includes(answerIndex)
    ) {
      newAnswers[currentQuestionIndex.toString()] = newAnswers[currentQuestionIndex]!.filter(
        (a) => a !== answerIndex,
      );
    } else {
      newAnswers[currentQuestionIndex.toString()] = [
        ...(answers[currentQuestionIndex] || []),
        answerIndex,
      ];
    }

    setAnswers(newAnswers);
  };

  const isSelectedAnswer = (answerIndex: number): string => {
    if (
      answers[currentQuestionIndex] !== undefined &&
      answers[currentQuestionIndex]?.includes(answerIndex) === true
    ) {
      return "ring-2 ring-[#44AF96] ring-inset";
    } else {
      return "";
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="font-future mx-auto flex h-12 w-32 rounded-3xl bg-[#721F79] p-3 pl-6 text-center text-2xl font-normal text-white">
        QUIZ
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent
        className={`max-h-[85%] w-full max-w-[360px] overflow-y-auto rounded-lg border-[#848484] bg-[#1C1C1C] lg:mx-2 lg:mx-7 lg:w-full lg:max-w-fit`}
      >
        <DialogHeader>
          <DialogTitle>
            <DialogTrigger className="w-full text-right text-[#44AF96]">X</DialogTrigger>

            <div className="flex flex-col text-start">
              <span className="font-clash-display w-full text-xl font-semibold text-white lg:text-3xl">
                {quiz.title}
              </span>
              <span className="font-poppins w-full text-base font-light text-white">{`Quiz Question ${
                currentQuestionIndex + 1
              }/${quiz.questions.length}`}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="h-[75%] max-h-[80%] bg-[#242424] pb-5">
          <div className="flex flex-col rounded-md bg-[#242424] p-3 lg:p-6">
            <div className="mt-4 h-[45%] max-h-fit w-full overflow-auto scroll-smooth">
              <span className="font-poppins mb-4 w-full text-lg font-bold leading-5 text-white">
                {quiz.questions[currentQuestionIndex]!.question}
              </span>
              {quiz.questions[currentQuestionIndex]!.options.map((option, index) => {
                return (
                  <div
                    className={`${index === 0 ? "mt-4" : ""} font-poppins ${
                      quiz.questions[currentQuestionIndex]!.options.length >= 4 ? "mb-3" : "mb-4"
                    } w-full cursor-pointer rounded-3xl bg-[#303030] ${isSelectedAnswer(index)}	p-3	${
                      quiz.questions[currentQuestionIndex]!.options.length >= 4
                        ? "text-xs"
                        : "text-base"
                    } text-[#F9F9F9]`}
                    onClick={() => {
                      selectAnswer(index);
                    }}
                    key={index}
                  >
                    {`${option.answer}`}
                  </div>
                );
              })}
            </div>
          </div>
        </DialogDescription>

        <DialogFooter>
          <div className={`flex w-full items-center`}>
            <div className="flex w-full">
              <ButtonRaw
                type="button"
                className={`button-rounded mr-4 text-xs font-normal text-white lg:w-24 ${previousButtonVisibility()}`}
                onClick={previousQuestion}
              >
                {"<"}
              </ButtonRaw>
              <ButtonRaw
                type="button"
                className={`button-rounded mr-4 text-xs font-normal text-white lg:w-24 ${nextButtonVisibility()}`}
                onClick={nextQuestion}
              >
                {">"}
              </ButtonRaw>
              <ButtonRaw
                className="font-future w-32 rounded-3xl bg-[#636363] text-xs font-normal text-white"
                onClick={submit}
                disabled={Object.keys(answers).length !== quiz.questions.length}
              >
                {!quizzesAddIsLoading ? "Submit" : <Spinner />}
              </ButtonRaw>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Quiz;
