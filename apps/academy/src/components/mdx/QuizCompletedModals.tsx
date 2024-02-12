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
  // useToast,
} from "ui";

export interface QuizProps {
  nextLessonURLPath: string;
  nextLessonTitle: string;
  actualLessonTitle: string;
}

export type Answers = Record<string, number[]>;

const QuizCompletedModals = (props: QuizProps): JSX.Element => {
  const [showDialog, setShowDialog] = useState(false);
  const [showKeepGoingModal, setShowKeepGoingModal] = useState(false);

  const handleLessonDoneClick = () => {
    setShowKeepGoingModal(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <>
      <div className="w-full text-center">
        <ButtonRaw
          className="font-future mx-auto flex h-fit w-fit rounded-3xl
          bg-[#721F79] text-2xl font-normal text-white"
          onClick={() => {
            setShowDialog(true);
          }}
        >
          QUIZ COMPLETED
        </ButtonRaw>
      </div>
      <Dialog open={showDialog} onOpenChange={handleClose}>
        <DialogOverlay />
        <DialogContent // ${ showCompleteStatusModal ? " h-full " : " mt-8 " }
          className={`mb-[23rem] max-w-[23rem] rounded-[60px] border border-[#848484] bg-[#1C1C1C] lg:mb-[51rem] lg:min-w-[51rem] lg:px-14`}
        >
          <DialogHeader className="w-full">
            <DialogTitle /* className="font-poppins text-base font-bold leading-9 text-white	lg:text-xl"*/
            >
              <DialogTrigger className="w-full text-right text-[#44AF96]">X</DialogTrigger>
              <div className="w-full text-center">
                {!showKeepGoingModal ? (
                  <span className="font-clash-display w-full text-center text-2xl font-bold leading-8 text-white">
                    Quiz complete!
                  </span>
                ) : (
                  <span className="font-clash-display w-full text-center text-2xl font-bold leading-8 text-white">
                    Nice!
                  </span>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mb-[3rem] h-[35rem] max-h-[35rem] w-full rounded-md bg-[#242424] pb-5 lg:mb-0">
            <div className="flex flex-col gap-4 lg:p-0">
              {!showKeepGoingModal ? (
                <div className="max-h-64 w-fit lg:mt-11 lg:h-96 lg:w-full">
                  <div
                    className={`font-clash-display w-full cursor-pointer rounded-3xl p-3 text-center font-bold text-[#F9F9F9]`}
                  >
                    <h1 className="font-clash-display mb-11 text-3xl lg:text-[26px]">
                      You&apos;re doing great!
                    </h1>
                    <Image
                      src={"/happy_face.png"}
                      alt="happy_face_icon"
                      width={100}
                      height={100}
                      className="mx-auto mb-16"
                    />
                    <p className="mb-20 text-base font-normal leading-5 text-[#FFFFFF] lg:mb-10 lg:text-2xl">
                      You&apos;ve completed the quiz for this section.
                    </p>
                    <ButtonRaw
                      className="font-future h-14 w-36 bg-[#721F79] lg:h-[4.125rem] lg:w-80 lg:min-w-[21rem] lg:text-base"
                      onClick={handleLessonDoneClick}
                    >
                      Done!
                    </ButtonRaw>
                  </div>
                </div>
              ) : (
                <div className="h-64 w-fit lg:mt-11 lg:h-96 lg:w-full">
                  <div
                    className={`font-clash-display w-full cursor-pointer rounded-3xl p-3 text-center font-bold text-[#F9F9F9]`}
                  >
                    <h1 className="font-clash-display mb-11 text-3xl lg:text-[26px]">
                      Keep going!
                    </h1>
                    <Image
                      src={"/happy_face.png"}
                      alt="happy_face_icon"
                      width={100}
                      height={100}
                      className="mx-auto mb-16"
                    />
                    <p className="mb-20 text-base font-normal leading-5 text-[#FFFFFF] lg:mb-10 lg:text-2xl">
                      {`You've just completed ${props.actualLessonTitle}!`}
                    </p>
                    <NextLink href={props.nextLessonURLPath}>
                      <ButtonRaw className="font-future h-fit w-fit bg-[#44AF96] lg:h-[4.125rem] lg:w-80 lg:min-w-[21rem] lg:text-base">
                        {`NEXT: ${props.nextLessonTitle}`}
                      </ButtonRaw>
                    </NextLink>
                  </div>
                </div>
              )}
            </div>
          </DialogDescription>

          <DialogFooter>
            {/* <div className="flex w-full">
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
            </div> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizCompletedModals;
