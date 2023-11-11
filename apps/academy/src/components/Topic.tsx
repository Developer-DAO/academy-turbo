import Image from "next/image";
import { useState } from "react";
import { Icons } from "ui";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "ui/components/ui/collapsible";

export default function Topic() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative pt-8">
      <div className="flex gap-4 px-5">
        <div className="relative mt-6 h-10 w-10 shrink-0 rounded-[50%] bg-white">
          <Image
            src="/arrow-up-bold.png"
            alt="Arrow"
            width={20}
            height={25}
            className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90"
          />
        </div>
        <div className="shrink grow basis-auto self-stretch leading-[100.5%]">
          <h2 className="text-2xl font-bold">Topic Heading</h2>
          <p className="mt-4 text-base">
            Understand the types of numbers you can work with, how to store x, and how to convert Y
            to Z.
          </p>
        </div>
      </div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-9">
        <CollapsibleTrigger className="ml-8 flex items-center gap-1">
          {isOpen ? (
            <Image src="/arrow-up-bold.png" alt="Arrow" width={20} height={25} />
          ) : (
            <Image
              src="/arrow-up-bold.png"
              alt="Arrow"
              width={20}
              height={25}
              className="rotate-180"
            />
          )}
          <h3 className="text-xl font-bold leading-tight">6 steps</h3>
        </CollapsibleTrigger>

        {/* This is where collapsible content starts */}
        <CollapsibleContent className="mt-8">
          <div className="ml-11 h-px w-80 border border-white"></div>
          <div className="mt-8 flex items-center gap-x-1.5">
            <Icons.track_tick className="ml-6 mr-2.5" />
            <p className="text-xl font-bold">Sub-topic heading</p>
          </div>
        </CollapsibleContent>
        <CollapsibleContent className="mt-8">
          <div className="ml-11 h-px w-80 border border-white"></div>
          <div className="mt-8 flex items-center gap-x-1.5">
            <Icons.track_tick className="ml-6 mr-2.5" />
            <p className="text-xl font-bold">Sub-topic heading</p>
          </div>
        </CollapsibleContent>
        <CollapsibleContent className="mt-8">
          <div className="ml-11 h-px w-80 border border-white"></div>
          <div className="mt-8 flex items-center gap-x-1.5">
            {/* <Image src="/tick.png" alt="Arrow" width={24} height={24} className="ml-6" /> */}
            <p className="ml-14 text-xl font-bold">Sub-topic heading</p>
          </div>
        </CollapsibleContent>
        <CollapsibleContent className="mt-8">
          <div className="ml-11 h-px w-80 border border-white"></div>
          <div className="mt-8 flex items-center gap-x-1.5">
            {/* <Image src="/tick.png" alt="Arrow" width={24} height={24} className="ml-6" /> */}
            <p className="ml-14 text-xl font-bold">Sub-topic heading</p>
          </div>
        </CollapsibleContent>
        <CollapsibleContent className="mt-8">
          <div className="ml-11 h-px w-80 border border-white"></div>
          <div className="mt-8 flex items-center gap-x-1.5">
            {/* <Image src="/tick.png" alt="Arrow" width={24} height={24} className="ml-6" /> */}
            <p className="ml-14 text-xl font-bold">Sub-topic heading</p>
          </div>
        </CollapsibleContent>
        <CollapsibleContent className="mt-8">
          <div className="ml-11 h-px w-80 border border-white"></div>
          <div className="mt-8 flex items-center gap-x-1.5">
            {/* <Image src="/tick.png" alt="Arrow" width={24} height={24} className="ml-6" /> */}
            <p className="ml-14 text-xl font-bold">Sub-topic heading</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
}
