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
import { getCorrectAnswersIndexes, haveSameElements, toLetters } from "@/utils/QuizHelpers";
export interface QuizProps {
  quiz: string;
  nextLessonURLPath: string;
  nextLessonTitle: string;
  actualLessonTitle: string;
  quizCompleted: boolean;
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
  const [showQuiz, setShowQuiz] = useState(props.quizCompleted);
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
    console.log({ answerIndex });
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
      return "border-2 border-[#44AF96]";
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="w-full text-center">
        <ButtonRaw
          className="font-future mx-auto flex h-12 w-36 rounded-3xl
          bg-[#721F79] text-2xl font-normal text-white"
          onClick={() => {
            setShowQuiz(true);
          }}
        >
          QUIZ
        </ButtonRaw>
      </div>
      <Dialog open={showQuiz} onOpenChange={cancelQuiz}>
        <DialogOverlay />
        <DialogContent className={`rounded-lg border-black bg-[#1C1C1C] `}>
          <DialogHeader>
            <DialogTitle /* className="font-poppins text-base font-bold leading-9 text-white	lg:text-xl"*/
            >
              <DialogTrigger className="w-full text-right text-[#44AF96]">X</DialogTrigger>

              <div className="mx-8 flex flex-col text-start">
                <span className="font-clash-display w-full text-xl font-bold leading-9 text-white lg:text-3xl">
                  {quiz.title}
                </span>
                <span className="font-poppins w-full text-base font-light text-white">{`Quiz Question ${
                  currentQuestionIndex + 1
                }/${quiz.questions.length}`}</span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mx-7 h-[85%] max-h-[85%] bg-[#242424] pb-5 lg:mx-12 ">
            <div className="flex flex-col gap-4 rounded-md bg-[#242424] p-6">
              <div className="mt-5 h-[50%] max-h-[50%] w-full overflow-auto scroll-smooth">
                <span className="font-clash-display mb-10 w-full text-xl font-bold leading-5 text-white">
                  {quiz.questions[currentQuestionIndex]!.question}
                </span>
                {quiz.questions[currentQuestionIndex]!.options.map((option, index) => {
                  return (
                    <div
                      className={`${
                        index === 0
                          ? `${
                              quiz.questions[currentQuestionIndex]!.options.length >= 4
                                ? "mt-9"
                                : "mt-12"
                            } `
                          : ""
                      } font-clash-display ${
                        quiz.questions[currentQuestionIndex]!.options.length >= 4 ? "mb-5" : "mb-7"
                      } w-full cursor-pointer rounded-3xl bg-[#303030] ${isSelectedAnswer(
                        index,
                      )}	p-5	${
                        quiz.questions[currentQuestionIndex]!.options.length >= 4
                          ? "text-base"
                          : "text-lg"
                      } font-bold text-[#F9F9F9]`}
                      onClick={() => {
                        selectAnswer(index);
                      }}
                      key={index}
                    >
                      {`${toLetters(index + 1)}. ${option.answer}`}
                    </div>
                  );
                })}
              </div>
            </div>
          </DialogDescription>

          <DialogFooter>
            <div className={`just flex w-full items-center`}>
              <div className="flex w-full">
                <ButtonRaw
                  type="button"
                  className={`button-rounded mr-4 text-xs font-normal text-white lg:w-40 ${previousButtonVisibility()}`}
                  onClick={previousQuestion}
                >
                  {"Previous"}
                </ButtonRaw>
                <ButtonRaw
                  type="button"
                  className={`button-rounded mr-4 w-32 text-xs font-normal text-white ${nextButtonVisibility()}`}
                  onClick={nextQuestion}
                >
                  {"Next"}
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
    </>
  );
};

export default Quiz;
