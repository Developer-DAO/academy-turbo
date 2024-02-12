import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "ui";

interface Props {
  buttonText: string;
  title?: string;
  children: React.ReactNode;
}

export default function LessonQuestionsModal({ buttonText, title, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger
        className="font-future mx-auto my-3 flex w-fit rounded-3xl bg-[#721F79]
          p-2 text-2xl font-normal text-white"
      >
        {buttonText}
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent className="mb-32 mt-10 max-h-screen overflow-y-auto border-0 bg-[#1C1C1C] lg:min-w-[50%] ">
        <DialogHeader>
          <DialogTitle className="font-clash-display m-2 text-2xl font-bold text-white">
            <div className="w-full text-right text-[#44AF96]">
              <DialogTrigger className="font-semibold	">X</DialogTrigger>
            </div>
            {title}
          </DialogTitle>
          <DialogDescription className={`bg-[#1C1C1C] ${title === undefined ? "text-white" : ""}`}>
            {children}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
