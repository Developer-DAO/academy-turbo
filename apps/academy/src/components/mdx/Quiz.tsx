import React, { useState } from "react";
import {
  Button,
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

import { useAppContext } from "@/contexts/AppContext";
import { api } from "@/utils/api";
import { getCorrectAnswersIndexes, haveSameElements } from "@/utils/QuizHelpers";

export interface QuizProps {
  quiz: string;
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

type Answers = Record<string, number[]>;

const Quiz = (props: QuizProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const quiz: Quiz = require(`@/data/quizzes/${props.quiz}.json`);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [correctAnswers, setCorrectAnswers] = useState<number[] | null>(null);
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

  const selectAnswer = (answerIndex: number) => {
    const newAnswers: Answers = { ...answers };

    if (
      newAnswers !== undefined &&
      Object.keys(newAnswers).length > 0 &&
      currentQuestionIndex !== undefined &&
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

  const getQuestionBackground = (optionIndex: number) => {
    if (
      correctAnswers !== null &&
      correctAnswers !== undefined &&
      correctAnswers.includes(currentQuestionIndex) &&
      quiz.questions[currentQuestionIndex]?.options[optionIndex]?.correct !== undefined &&
      quiz.questions[currentQuestionIndex]?.options[optionIndex]?.correct === true &&
      answers[currentQuestionIndex]?.includes(optionIndex) === true
    ) {
      return "green.500";
    }

    return "gray.600";
  };

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
      },
    });

  const quizSuccessToast = () => {
    cancelQuiz();
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const lessonIdToSave: string = allLessonsData.find(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (lesson) => lesson.quizFileName === `${props.quiz}.json`,
    )?.id;

    if (lessonIdToSave === undefined) {
      console.error("Lesson not found");
      return;
    }

    quizzesAddMutate({
      lesson: lessonIdToSave,
    });
  };

  const cancelQuiz = () => {
    setAnswers({});
    setShowQuiz(false);
    setCorrectAnswers(null);
    setCurrentQuestionIndex(0);
  };

  return (
    <>
      <Button
        className="mx-auto flex bg-yellow-600 text-white"
        onClick={() => {
          setShowQuiz(true);
        }}
      >
        Take quiz
      </Button>

      <Dialog open={showQuiz} onOpenChange={cancelQuiz}>
        <DialogOverlay />
        <DialogContent className="bg-[#1C1C1C]">
          <DialogHeader>
            <DialogTitle className="font-poppins text-base font-bold leading-9	text-white	">
              {quiz.title} <br />
              <span className="w-full">{`Question ${currentQuestionIndex + 1}/${
                quiz.questions.length
              }`}</span>
            </DialogTitle>
          </DialogHeader>
          <DialogTrigger />
          <DialogDescription className="pb-6">
            <div className="flex flex-col gap-4 rounded-md bg-gray-900 p-6">
              <span className="font-clash-display w-full text-2xl font-bold leading-6	 text-white">
                {quiz.questions[currentQuestionIndex]!.question}
              </span>
              {quiz.questions[currentQuestionIndex]!.options.map((o, index) => {
                return (
                  <div
                    className={`w-full cursor-pointer rounded-md p-3 bg-${getQuestionBackground(
                      index,
                    )}`}
                    onClick={() => {
                      selectAnswer(index);
                    }}
                    key={index}
                  >
                    {o.answer}
                  </div>
                );
              })}
              <div className="just flex w-full items-center">
                <div className="flex w-full">
                  <Button
                    className={`mx-2 ${previousButtonVisibility()}`}
                    onClick={previousQuestion}
                  >
                    {"< Previous"}
                  </Button>
                  <Button className={`${nextButtonVisibility()}`} onClick={nextQuestion}>
                    {"Next >"}
                  </Button>
                </div>
              </div>
            </div>
          </DialogDescription>

          <DialogFooter>
            <Button className="mx-1 flex bg-red-400 text-white" onClick={cancelQuiz}>
              Cancel
            </Button>
            <Button
              className="mx-1 flex bg-green-400 text-white"
              onClick={submit}
              isLoading={quizzesAddIsLoading}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Quiz;
