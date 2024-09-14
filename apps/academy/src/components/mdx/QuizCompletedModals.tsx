// import Image from "next/image";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
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
} from "ui";

import { createTwitterIntentLink } from "@/utils/create-twitter-intent-link";

export interface QuizProps {
  nextLessonURLPath: string;
  nextLessonTitle: string;
  actualLessonTitle: string;
  quizCompleted: boolean;
  successMessage?: { message: string }[] | undefined;
  successTitle?: string | undefined;
  currentLessonPath: string;
  actionButton?: { href: string; text: string } | null | undefined;
  partnerTwitterHandle?: string | undefined;
}

export type Answers = Record<string, number[]>;

const QuizCompletedModals = ({
  nextLessonURLPath,
  actualLessonTitle,
  quizCompleted,
  successMessage = [
    {
      message:
        "You answered all the quiz questions correctly, great job. Celebrate your learning on Twitter and advance to the next lesson below.",
    },
  ],
  currentLessonPath,
  actionButton,
  partnerTwitterHandle,
}: QuizProps): JSX.Element => {
  const [showDialog, setShowDialog] = useState(false);
  // const [showKeepGoingModal, setShowKeepGoingModal] = useState(false);

  useEffect(() => {
    if (quizCompleted) {
      setShowDialog(true);
    }
  }, [quizCompleted]);

  const handleLessonDoneClick = () => {
    // setShowKeepGoingModal(true);
    setShowDialog(false);
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
                {/*   {!showKeepGoingModal ? ( */}
                <span className="font-clash-display w-full text-center text-2xl font-bold leading-8 text-white">
                  {actualLessonTitle}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mb-[3rem] h-[35rem] max-h-[35rem] w-full rounded-md bg-[#242424] pb-5 lg:mb-0">
            <div className="flex flex-col gap-4 lg:p-0">
              {/*  {!showKeepGoingModal ? ( */}
              <div className="max-h-64 w-fit lg:mt-11 lg:h-96 lg:w-full">
                <div
                  className={`font-clash-display w-full rounded-3xl p-3 text-center font-bold text-[#F9F9F9]`}
                >
                  {/* <h1 className="font-clash-display mb-11 text-3xl lg:text-[26px]">
                    {successTitle}
                  </h1> */}
                  {successMessage.map((message, index) => {
                    return (
                      <p
                        className="mb-20 text-base font-normal leading-5 text-[#FFFFFF] lg:mb-6 lg:text-2xl"
                        key={index}
                      >
                        {message.message}
                      </p>
                    );
                  })}
                  <div className="flex flex-col gap-y-6">
                    <a
                      href={createTwitterIntentLink(
                        partnerTwitterHandle === undefined
                          ? `I completed "${actualLessonTitle}" on @developer_dao Academy. https://academy.developerdao.com${currentLessonPath}`
                          : `I completed "${actualLessonTitle}" lesson from ${partnerTwitterHandle} track on @developer_dao Academy. https://academy.developerdao.com${currentLessonPath}`,
                      )}
                      target="_blank"
                    >
                      <ButtonRaw className="font-future h-8 w-24 bg-[#721F79] lg:h-14 lg:w-80 lg:min-w-[21rem] lg:text-base">
                        Share on Twitter
                      </ButtonRaw>
                    </a>
                    {actionButton ? (
                      <a href={actionButton.href} target="_blank">
                        <ButtonRaw className="font-future h-8 w-24 bg-[#721F79] lg:h-14 lg:w-80 lg:min-w-[21rem] lg:text-base">
                          {actionButton.text}
                        </ButtonRaw>
                      </a>
                    ) : null}
                    {nextLessonURLPath ? (
                      <NextLink href={nextLessonURLPath}>
                        <ButtonRaw
                          // variant="outline"
                          className="font-future h-14 w-36 hover:bg-[#721F79] lg:h-14 lg:w-80 lg:min-w-[21rem] lg:text-base"
                          onClick={handleLessonDoneClick}
                        >
                          Next Lesson
                        </ButtonRaw>
                      </NextLink>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizCompletedModals;
