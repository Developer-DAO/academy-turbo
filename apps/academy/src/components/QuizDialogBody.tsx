import React from "react";

import type { Answers } from "@/components/mdx/Quiz";
import { isSelectedAnswer, selectAnswer, toLetters } from "@/utils/QuizHelpers";

interface Props {
  quizQuestionTitle: string;
  quizOptions: [
    {
      answer: string;
      correct?: boolean;
    },
  ][];
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  answers: Answers;
  correctAnswers: number[];
}

const QuizDialogBody = ({
  quizQuestionTitle,
  quizOptions,
  correctAnswers,
  answers,
  setAnswers,
}: Props) => {
  return (
    <div className="mt-5 h-[50%] max-h-[50%] w-full overflow-auto scroll-smooth">
      <span className="font-clash-display mb-10 w-full text-xl font-bold leading-5 text-white">
        {quizQuestionTitle}
      </span>
      {quizOptions.map((option, index) => {
        return (
          <div
            className={`${
              index === 0 ? `${quizOptions.length >= 4 ? "mt-9" : "mt-12"} ` : ""
            } font-clash-display ${
              quizOptions.length >= 4 ? "mb-5" : "mb-7"
            } w-full cursor-pointer rounded-3xl bg-[#303030] ${isSelectedAnswer(
              index,
              correctAnswers,
            )}	p-5	${quizOptions.length >= 4 ? "text-base" : "text-lg"} font-bold text-[#F9F9F9]`}
            onClick={() => {
              selectAnswer(index, answers, index, setAnswers);
            }}
            key={index}
          >
            {`${toLetters(index + 1)}. ${option[0].answer}`}
          </div>
        );
      })}
    </div>
  );
};

export default QuizDialogBody;
