import Link from "next/link";
import React from "react";
import { TrackCard } from "ui";

import TracksLayout from "@/components/TracksLayout";

const IntroToEthereumPage = () => {
  const lessonsArray = [
    {
      title: "Introduction to Smart Contract Development with Solidity",
      author: "_7i7o, piablo", // ["_7i7o", "piablo"],
      imgPath: "/image16.png",
      description:
        "Beginner-friendly. Create your first Solidity smart contract and learn the fundamentals of blockchain development. Checkpoint quizzes included.",
      tags: ["Beginner", "Web3", "ERC-20"],
      path: "/tracks/erc-20-solidity/1",
    },
    {
      title: "Your own ERC-20 Token: A Step-by-Step Guide using Foundry",
      author: "_7i7o, piablo",
      imgPath: "/image16.png",
      description:
        "Foundry demystified: ERC-20 token creation for beginners. Probing quizzes throughout. Grasp the fundamentals and empower yourself to build and customize.",
      tags: ["Beginner", "Web3", "ERC-20"],
      path: "/tracks/erc-20-solidity/2",
    },
  ];
  return (
    <div className="relative m-10 flex lg:mx-60 lg:mb-40 lg:mt-40">
      <TracksLayout
        trackTitle="ERC-20 Solidity Track"
        trackDescription="Need description for this track"
        trackAuthor="_7i7o, piablo"
        trackAuthorDescription="Authors are active Developer DAO members"
        trackAuthorTwitter="@_7i7o.eth, @Skruffster"
        tags={["Beginner", "Web3", "Eth", "Solidity", "ERC-20", "Foundry"]}
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
