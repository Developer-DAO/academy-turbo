import Link from "next/link";
import React from "react";
import { TrackCard } from "ui";

import TracksLayout from "@/components/TracksLayout";

const IntroToEthereumPage = () => {
  const lessonsArray = [
    {
      title: "A Developer's Guide to Ethereum, Pt.1",
      author: "wolovim",
      imgPath: "/image16.png",
      description:
        "Dive into Ethereum basics with web3.py and Python. Simulate a node, read blocks, check balances, and send transactions. Focus on concepts, not final products, with included code.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "A Developer's Guide to Ethereum, Pt.2",
      author: "wolovim",
      imgPath: "/image16.png",
      description:
        "Explore Ethereum's core — blockchain, decentralization, and ether. Build on Part 1, grasping implications for developers. Practical insights and code provided for understanding.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "A Developer's Guide to Ethereum, Pt.3",
      author: "wolovim",
      imgPath: "/image16.png",
      description:
        "From blockchain fundamentals to accounts and now smart contracts. Unveil the programmable, decentralized world with practical insights and code.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
  ];
  return (
    <div className="relative m-10 flex lg:mx-60 lg:mb-40 lg:mt-40">
      <TracksLayout
        trackTitle="A Developer's Guide to Ethereum"
        trackDescription="Begin your journey with A Developer's Guide to Ethereum, leveraging web3.py and Python. Explore blockchain essentials, Ethereum's decentralized realm, and learn about smart contracts with practical insights. The series blends theory and hands-on learning, providing code to reinforce understanding. Ideal for developers transitioning to Ethereum through a Python lens."
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
