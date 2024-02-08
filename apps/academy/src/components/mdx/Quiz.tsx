import Image from "next/image";
import NextLink from "next/link";
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

import QuizDialogBody from "@/components/QuizDialogBody";
import Spinner from "@/components/Spinner";
import { useAppContext } from "@/contexts/AppContext";
import { api } from "@/utils/api";
import { getCorrectAnswersIndexes, haveSameElements } from "@/utils/QuizHelpers";
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
  const [correctAnswers, setCorrectAnswers] = useState<number[] | null>(null);
  const [showCompleteStatusModal, setShowCompleteStatusModal] = useState(false);
  const [showKeepGoingModal, setShowKeepGoingModal] = useState(false);

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

  const quizOptionsToShow: any = quiz.questions
    .map((question) => {
      return question.options;
    })
    .flat();
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
        setShowCompleteStatusModal(true);
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

  const handleLessonDoneClick = () => {
    setShowKeepGoingModal(true);
  };
  console.log({ a: quiz.questions.map((question) => question.options) });
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
        <DialogContent
          className={`rounded-lg border-black bg-[#1C1C1C] ${
            showCompleteStatusModal ? " h-full " : " mt-8 "
          } `}
        >
          <DialogHeader>
            <DialogTitle /* className="font-poppins text-base font-bold leading-9 text-white	lg:text-xl"*/
            >
              <DialogTrigger className="w-full text-right text-[#44AF96]">X</DialogTrigger>
              {!showCompleteStatusModal ? (
                <div className="mx-8 flex flex-col text-start">
                  <span className="font-clash-display w-full text-xl font-bold leading-9 text-white lg:text-3xl">
                    {quiz.title}
                  </span>
                  <span className="font-poppins w-full text-base font-light text-white">{`Quiz Question ${
                    currentQuestionIndex + 1
                  }/${quiz.questions.length}`}</span>
                </div>
              ) : !showKeepGoingModal ? (
                <span className="font-clash-display w-full text-center text-2xl font-bold leading-8 text-white">
                  Quiz complete!
                </span>
              ) : (
                <span className="font-clash-display w-full text-center text-2xl font-bold leading-8 text-white">
                  Nice!
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mx-7 h-[85%] max-h-[85%] bg-[#242424] pb-5 lg:mx-12 ">
            <div className="flex flex-col gap-4 rounded-md bg-[#242424] p-6">
              {!showCompleteStatusModal ? (
                <QuizDialogBody
                  quizOptions={quizOptionsToShow}
                  quizQuestionTitle={`${quiz.title}`}
                  answers={answers}
                  setAnswers={setAnswers}
                  correctAnswers={correctAnswers !== null ? correctAnswers : []}
                />
              ) : // <div className="mt-5 h-[50%] max-h-[50%] w-full overflow-auto scroll-smooth">
              //   <span className="font-clash-display mb-10 w-full text-xl font-bold leading-5 text-white">
              //     {quiz.questions[currentQuestionIndex]!.question}
              //   </span>
              //   {quiz.questions[currentQuestionIndex]!.options.map((option, index) => {
              //     return (
              //       <div
              //         className={`${
              //           index === 0
              //             ? `${
              //                 quiz.questions[currentQuestionIndex]!.options.length >= 4
              //                   ? "mt-9"
              //                   : "mt-12"
              //               } `
              //             : ""
              //         } font-clash-display ${
              //           quiz.questions[currentQuestionIndex]!.options.length >= 4
              //             ? "mb-5"
              //             : "mb-7"
              //         } w-full cursor-pointer rounded-3xl bg-[#303030] ${isSelectedAnswer(
              //           index,
              //         )}	p-5	${
              //           quiz.questions[currentQuestionIndex]!.options.length >= 4
              //             ? "text-base"
              //             : "text-lg"
              //         } font-bold text-[#F9F9F9]`}
              //         onClick={() => {
              //           selectAnswer(index);
              //         }}
              //         key={index}
              //       >
              //         {`${toLetters(index + 1)}. ${option.answer}`}
              //       </div>
              //     );
              //   })}
              // </div>
              !showKeepGoingModal ? (
                <div className="h-64 w-fit lg:h-96 lg:w-72">
                  <div
                    className={`font-clash-display w-full cursor-pointer rounded-3xl bg-[#303030] p-3 	text-center	text-lg font-bold text-[#F9F9F9]`}
                  >
                    <h1 className="font-clash-display mb-11">You&apos;re doing great!</h1>
                    <Image
                      src={"/happy_face.png"}
                      alt="happy_face_icon"
                      width={100}
                      height={100}
                      className="mx-auto mb-16"
                    />
                    <p className="mb-10 text-base font-normal leading-5 text-[#FFFFFF]">
                      You&apos;ve completed the quiz for this section.
                    </p>
                    <ButtonRaw
                      className="font-future h-14 w-36 bg-[#721F79]"
                      onClick={handleLessonDoneClick}
                    >
                      Done!
                    </ButtonRaw>
                  </div>
                </div>
              ) : (
                <div className="h-fit w-fit lg:h-96 lg:w-72">
                  <div
                    className={`font-clash-display w-full cursor-pointer rounded-3xl bg-[#303030] p-3 	text-center	text-lg font-bold text-[#F9F9F9]`}
                  >
                    <h1 className="font-clash-display mb-11">Keep going!</h1>
                    <Image
                      src={"/happy_face.png"}
                      alt="happy_face_icon"
                      width={100}
                      height={100}
                      className="mx-auto mb-16"
                    />
                    <p className="mb-10 text-base font-normal leading-5 text-[#FFFFFF]">
                      {`You've just completed ${props.actualLessonTitle}!`}
                    </p>
                    <NextLink href={props.nextLessonURLPath}>
                      <ButtonRaw className="font-future w-32 rounded-3xl bg-[#44AF96] text-xs font-normal text-white">
                        {`NEXT: ${props.nextLessonTitle}`}
                      </ButtonRaw>
                    </NextLink>
                  </div>
                </div>
              )}
            </div>
          </DialogDescription>

          <DialogFooter>
            {/* {(Object.keys(answers).length !== quiz.questions.length) === true ? ( */}
            <div
              className={`just flex w-full items-center ${
                !showKeepGoingModal ? "block" : "hidden"
              }`}
            >
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
