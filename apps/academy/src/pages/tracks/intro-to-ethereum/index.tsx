import Link from "next/link";
import React from "react";
import { TrackCard } from "ui";

import TracksLayout from "@/components/TracksLayout";

const IntroToEthereumTrackPage = () => {
  const lessonsArray = [
    {
      title: "A Developer's Guide to Ethereum, Pt. 1",
      author: "wolovim",
      imgPath: "/image16.png",
      description:
        "Dive into Ethereum basics with web3.py and Python. Simulate a node, read blocks, check balances, and send transactions. Focus on concepts, not final products, with included code.",
      tags: ["Entry", "Eth", "Block"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "A Developer's Guide to Ethereum, Pt. 2",
      author: "wolovim",
      imgPath: "/image16.png",
      description:
        "Explore Ethereum's core — blockchain, decentralization, and ether. Build on Part 1, grasping implications for developers. Practical insights and code provided for understanding.",
      tags: ["Entry", "Accounts", "Signing"],
      path: "/tracks/intro-to-ethereum/2",
    },
    {
      title: "A Developer's Guide to Ethereum, Pt. 3",
      author: "wolovim",
      imgPath: "/image16.png",
      description:
        "From blockchain fundamentals to accounts and now smart contracts. Unveil the programmable, decentralized world with practical insights and code.",
      tags: ["Entry", "OSS", "Contract"],
      path: "/tracks/intro-to-ethereum/3",
    },
  ];
  return (
    <div className="relative m-10 flex lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle="A Developer's Guide to Ethereum"
        trackDescription="An accessible introduction to Ethereum via web3.py and Python. Grasp blockchain basics, Ethereum's decentralization, and smart contracts with practical insights. Code included for hands-on learning, but no programming expertise required."
        trackAuthor="wolovim"
        trackAuthorDescription="wolovim is a Full Stack Python Developer at the Ethereum Foundation."
        trackAuthorTwitter="@wolovim.eth"
        tags={["Entry", "Open Source", "Blockchain", "Ethereum", "Python", "Web3.py", "Node"]}
      >
        <div className="mt-14 flex flex-col gap-8 lg:grid lg:w-full lg:grid-cols-3 lg:gap-10">
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

export default IntroToEthereumTrackPage;
