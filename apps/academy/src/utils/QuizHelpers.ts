import type { Answers } from "@/components/mdx/Quiz";

interface Question {
  question: string;
  options: [
    {
      answer: string;
      correct?: boolean;
    },
  ];
}

export function getCorrectAnswersIndexes(question: Question): number[] {
  return question.options
    .filter((option) => option.correct)
    .map((correctOption) => question.options.indexOf(correctOption));
}

export function haveSameElements(arr1: number[], arr2: number[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const arr1Sorted = arr1.sort();
  const arr2Sorted = arr2.sort();
  for (let i = 0; i < arr1Sorted.length; i++) {
    if (arr1Sorted[i] !== arr2Sorted[i]) {
      return false;
    }
  }
  return true;
}

export function toLetters(num: number): string {
  const mod = num % 26;
  let pow = (num / 26) | 0;
  const out = mod ? String.fromCharCode(64 + mod) : (--pow, "Z");
  return pow ? toLetters(pow) + out : out;
}

export function isSelectedAnswer(answerIndex: number, answers: number[]): string {
  if (answers !== undefined && answers.includes(answerIndex)) {
    return "border-2 border-[#44AF96]";
  } else {
    return "";
  }
}

export function selectAnswer(
  answerIndex: number,
  answers: Answers,
  currentQuestionIndex: number,
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>,
) {
  const newAnswers: Answers = { ...answers };

  if (
    newAnswers !== undefined &&
    Object.keys(newAnswers).length > 0 &&
    currentQuestionIndex !== undefined &&
    answers !== undefined &&
    answers !== null &&
    Object.keys(answers).length !== undefined &&
    Object.keys(answers).length > 0 &&
    Object.keys(answers).includes(answerIndex.toString())
  ) {
    newAnswers[currentQuestionIndex] = Object.keys(answers).filter(
      (a) => a !== answerIndex.toString(),
    );
  } else {
    newAnswers[currentQuestionIndex.toString()] = [...answers[currentQuestionIndex], answerIndex];
  }

  setAnswers(newAnswers);
}
