import Link from "next/link";
import React from "react";
import { TrackCard } from "ui";

import TracksLayout from "@/components/TracksLayout";

const IntroToEthereumPage = () => {
  const lessonsArray = [
    {
      title: "Intro to Ethereum Part I.",
      author: "wolovim",
      imgPath: "/image16.png",
      description:
        "Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "Intro to Ethereum Part II.",
      author: "wolovim",
      imgPath: "/image16.png",
      description:
        "Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "Intro to Ethereum Part III.",
      author: "wolovim",
      imgPath: "/image16.png",
      description:
        "Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
  ];
  return (
    <div className="relative m-10 flex lg:mx-60 lg:mb-40 lg:mt-40">
      <TracksLayout
        trackTitle="A Developer's Guide to Ethereum"
        trackDescription="Introduction to Ethereum with web3.py and Python."
        trackAuthor="wolovim"
        trackAuthorDescription="wolovim is a Full Stack Python Developer at the Ethereum Foundation."
        trackAuthorTwitter="@wolovim.eth"
        tags={["Beginner", "Web3", "Eth"]}
      >
        <div className="mt-14 flex flex-col gap-8 lg:grid lg:w-full lg:grid-cols-3 lg:gap-10 lg:p-20">
          {lessonsArray.map((track, idx) => (
            <Link href={track.path} key={idx}>
              <TrackCard
                imgSrc={track.imgPath}
                tags={track.tags}
                title={track.title}
                author={track.author}
                description={track.description}
              />
            </Link>
          ))}
        </div>
      </TracksLayout>
    </div>
  );
};

export default IntroToEthereumPage;
