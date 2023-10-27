import type { FC } from "react";
import React from "react";
import { type NavItem, TopBar, TrackCard } from "ui";

import { ConnectButton } from "@/components/ConnectButton";

const sampleMenus: NavItem[] = [
  {
    name: "Fundamentals",
    href: "/",
    icon: "clarity_blocks",
  },
  {
    name: "Tracks",
    href: "/",
    icon: "vector",
  },
  {
    name: "Community",
    href: "/",
    icon: "dd_logo",
  },
];

const Fundamentals: FC = () => {
  return (
    <div className="flex h-screen w-full flex-col space-y-2.5 bg-black sm:flex-row sm:space-y-0">
      <div className="fixed inset-y-0 flex w-1/2 flex-1 flex-col items-center justify-between bg-[url('/fundamental-bg.jpeg')] bg-cover bg-no-repeat object-center">
        <div className="mt-10">
          <TopBar menus={sampleMenus} />
        </div>
        <div>
          <h2>Fundamentals</h2>
        </div>
        <div>
          <p className="text-3xl font-bold text-white">Nail the basics and then take on a track.</p>
        </div>
        <div />
      </div>
      <div className="fixed right-0 top-0 h-screen w-1/2">
        <div className="flex max-h-screen w-full flex-1 flex-col space-y-10 overflow-y-scroll bg-black px-8">
          <div className="mt-10 flex h-fit w-full justify-end">
            <ConnectButton />
          </div>
          <div className="flex w-full justify-center px-8">
            <div className="grid w-fit grid-cols-2 justify-center gap-x-10 gap-y-8 pb-8">
              <TrackCard imgSrc="/eth_fam.jpg" />
              <TrackCard imgSrc="/eth_fam.jpg" />
              <TrackCard imgSrc="/eth_fam.jpg" />
              <TrackCard imgSrc="/eth_fam.jpg" />
              <TrackCard imgSrc="/eth_fam.jpg" />
              <TrackCard imgSrc="/eth_fam.jpg" />
              <TrackCard imgSrc="/eth_fam.jpg" />
              <TrackCard imgSrc="/eth_fam.jpg" />
              <TrackCard imgSrc="/eth_fam.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fundamentals;
