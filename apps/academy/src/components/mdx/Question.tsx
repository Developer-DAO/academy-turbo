import React, { type Dispatch, type SetStateAction, useState } from "react";
import { Button, useToast } from "ui";

import { toLetters } from "@/utils/QuizHelpers";

export interface QuestionProps {
  question: string;
}

interface Question {
  question: string;
  options: [
    {
      answer: string;
      correct?: boolean;
    },
  ];
}

const Question = (props: QuestionProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const question: Question = require(`@/data/questions/${props.question}.json`);
  const [optionsSelected, setOptionsSelected]: [number[], Dispatch<SetStateAction<number[]>>] =
    useState([-1]);
  const { toast } = useToast();

  const selectAnswer = (optionIndex: number) => {
    if (optionsSelected.includes(optionIndex)) {
      setOptionsSelected(optionsSelected.filter((option) => option !== optionIndex));
      return;
    }

    setOptionsSelected(
      [...optionsSelected, optionIndex].filter((o) => o !== -1), // Remove the -1 of the state initialization
    );
  };
  // const getOptionBackground = (optionIndex: number) => {
  //   if (optionsSelected.includes(optionIndex)) {
  //     return "yellow.600";
  //   }
  //   return "gray.600";
  // };

  const quizNotAnswered = () => {
    toast({
      title: "No answer selected",
      description: "Choose an answer!",
      duration: 9000,
      variant: "default",
    });
  };

  const quizFailedToast = () => {
    toast({
      title: "Wrong answer",
      description: "Try again fren",
      duration: 9000,
      variant: "destructive",
    });
  };

  const quizSuccessToast = () => {
    toast({
      title: "Correct answer!",
      description: "Let's gooooooo",
      duration: 9000,
      variant: "default",
    });
  };

  const submit = () => {
    if (optionsSelected.includes(-1)) {
      quizNotAnswered();
      return;
    }
    const correctAnswers = question.options.filter((o) => o.correct).length;

    let success = true;
    let correctAnswersCount = 0;

    optionsSelected.forEach((o) => {
      if (question.options[o]?.correct === false) success = false;
      correctAnswersCount++;
    });

    if (correctAnswers !== correctAnswersCount) success = false;

    if (success) {
      quizSuccessToast();
      return;
    }

    quizFailedToast();
  };

  const isSelectedAnswer = (answerIndex: number): string => {
    if (optionsSelected !== undefined && optionsSelected.includes(answerIndex)) {
      return "border-2 border-[#44AF96]";
    } else {
      return "";
    }
  };

  return (
    <div className="mb-5 space-x-4 rounded-md bg-[#242424] p-6 text-white">
      <h2 className="w-full text-left font-semibold	">{question.question}</h2>
      {question.options.map((o, index) => {
        return (
          <div
            className={`font-clash-display mt-3 w-full cursor-pointer rounded-md bg-[#1C1C1C] p-3 text-left font-semibold text-white ${isSelectedAnswer(
              index,
            )}`}
            onClick={() => {
              selectAnswer(index);
            }}
            key={index}
          >
            {`${toLetters(index + 1)}. ${o.answer}`}
          </div>
        );
      })}
      <Button
        variant="text"
        className="mx-1 mt-7 self-start rounded-3xl border-0 bg-[#721F79]"
        onClick={submit}
      >
        Submit
      </Button>
    </div>
  );
};

export default Question;
