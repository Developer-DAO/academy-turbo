import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "ui";

interface Props {
  buttonText: string;
  children: React.ReactNode;
}

export default function LessonInformationalModal({ buttonText, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="my-3 flex rounded-2xl bg-yellow-600 p-2 font-semibold	text-white">
        {buttonText}
      </DialogTrigger>
      <DialogContent className="mb-20 mt-10 max-h-screen min-w-[75%] overflow-y-auto border-0 bg-[#1C1C1C] lg:w-fit">
        <DialogHeader>
          <DialogTrigger className="w-full text-right text-[#44AF96]">X</DialogTrigger>
          <DialogDescription className="bg-[#1C1C1C] text-white">{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
