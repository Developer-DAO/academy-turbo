import React /*, { useState, type Dispatch, type SetStateAction } */ from "react";
import { Button } from "ui";

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

const Question = (/* props: QuestionProps */): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  // const question: Question = require(`@/utils/questions/${props.question}.json`);
  // const [optionsSelected, setOptionsSelected]: [number[], Dispatch<SetStateAction<number[]>>] =
  // useState([-1]);
  // const toast = useToast();

  // const selectAnswer = (optionIndex: number) => {
  //   if (optionsSelected.includes(optionIndex)) {
  //     return setOptionsSelected(optionsSelected.filter((o) => o !== optionIndex));
  //   }

  //   setOptionsSelected(
  //     [...optionsSelected, optionIndex].filter((o) => o !== -1), // Remove the -1 of the state initialization
  //   );
  // };

  // const getOptionBackground = (optionIndex: number) => {
  //   if (optionsSelected.includes(optionIndex)) {
  //     return "yellow.600";
  //   }
  //   return "gray.600";
  // };

  // const quizNotAnswered = () => {
  // toast({
  //   title: "No answer selected",
  //   description: "Choose an answer!",
  //   status: "warning",
  //   duration: 9000,
  //   isClosable: true,
  // });
  // alert("No answer selected");
  // };

  const quizFailedToast = () => {
    // toast({
    //   title: "Wrong answer",
    //   description: `Try again fren`,
    //   status: "error",
    //   duration: 9000,
    //   isClosable: true,
    // });
    alert("Wrong answer");
  };

  const quizSuccessToast = () => {
    // toast({
    //   title: "Correct answer!",
    //   description: "Let's goooo",
    //   status: "success",
    //   duration: 9000,
    //   isClosable: true,
    // });
    alert("Correct answer!");
  };

  const submit = () => {
    // if (optionsSelected.includes(-1)) {
    //   return quizNotAnswered();
    // }
    //  const correctAnswers = question.options.filter((o) => o.correct).length;

    const success = true;
    //  let correctAnswersCount = 0;

    //  optionsSelected.forEach((o) => {
    //   if (!question.options[o]?.correct) success = false;
    //    correctAnswersCount++;
    // });

    // if (correctAnswers !== correctAnswersCount) success = false;

    if (success) { quizSuccessToast(); return; }

    quizFailedToast();
  };

  return (
    <div className="mt-7 space-x-4 rounded-md bg-gray-900 p-6">
      <h2 className="w-full text-left font-bold">{"question.question"}</h2>
      {/* {question.options.map((o, index) => {
        return (
          <div
            className="mt-3 w-full cursor-pointer rounded-md bg-gray-600 p-3"
            onClick={() => selectAnswer(index)}
            key={index}
          >
            {o.answer}
          </div>
        );
      })} */}
      <Button className="mx-1 mt-7 self-start bg-green-400" onClick={submit}>
        Submit
      </Button>
    </div>
  );
};

export default Question;
