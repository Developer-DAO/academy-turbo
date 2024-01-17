import Link from "next/link";
import React from "react";
import { TrackCard } from "ui";

const TracksPage = () => {
  const tracksArray = [
    {
      title: "Web3 Fundamentals",
      author: "georgemac510, elPiablo",
      imgPath: "/image16.png",
      description:
        "There is a lot more to Web3 than blockchains and smart contracts. This track provides resources and insights on various fundamental tooling and infrastructure needed for the magic you create in your projects to become a reality.",
      tags: ["Beginner", "Testnets", "Token standards"],
      trackPath: "/tracks/fundamentals",
    },
    {
      title: "A Developer's Guide to Ethereum, Part I, II & III",
      author: "wolovim",
      imgPath: "/image16.png",
      description:
        "Introduction to Ethereum with web3.py and Python. Grasp blockchain basics, Ethereum's decentralization, and smart contracts with practical insights. Code included for hands-on learning.",
      tags: ["Beginner", "Web3", "DeFi"],
      trackPath: "/tracks/intro-to-ethereum",
    },
    {
      title: "NFT track Part I-V",
      author: "7i7o, piablo, georgemac510, brianfive, ropats16, meowy, mveve",
      imgPath: "/image16.png",
      description:
        "Get stuck right into Solidity and on to the NFT train. You'll be building your own tiered ERC-721 token sets, creating a Test Driven Development suite, hosting your files on Web3 storage, and creating on your own front-end dApp. The full-stack-track.",
      tags: ["Beginner", "NFT", "Solidity"],
      trackPath: "/tracks/nft-solidity",
    },
    {
      title: "ERC-20 Solidity Track",
      author: "_7i7o, piablo",
      imgPath: "/image16.png",
      description:
        "Start with Solidity basics, or move straight on to creating an ERC-20 token using the Foundry development toolchain. Later, we'll explore more advanced concepts with real-world use cases, and best practices for creating and managing blockchain assets",
      tags: ["Beginner", "ERC-20", "Foundry"],
      trackPath: "/tracks/erc-20-solidity",
    },
    // {
    //   title: "Intro to Ethereum Part I, II & III.",
    //   author: "wolovim",
    //   imgPath: "/image16.png",
    //   description:
    //     "Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.",
    //   tags: ["Beginner", "Web3", "DeFi"],
    //   trackPath: "/tracks/intro-to-ethereum",
    // },
  ];
  return (
    <div className="flex h-full w-full flex-col space-y-10 overflow-hidden bg-black lg:h-screen lg:max-h-screen lg:flex-row">
      <div
        className="flex h-full min-h-screen flex-1 flex-col items-center justify-between overflow-hidden 
bg-[url('/fundamental-bg.jpeg')] bg-cover bg-no-repeat object-center pt-[300px]  lg:fixed lg:inset-y-0 lg:h-screen lg:w-1/2"
      >
        <div>
          <h2 className="text-bttf text-3xl text-white sm:text-5xl">Tracks</h2>
        </div>
        <div className="md:hidden" />
        <div className="flex justify-center">
          <p className="max-w-[275px] text-center text-xl font-bold text-white sm:max-w-xs md:max-w-full lg:text-2xl">
            DeveloperDAO learning tracks are designed <br /> to get you from 0 to 1.
          </p>
        </div>
        <div />
      </div>
      <div className="flex-0 flex lg:fixed lg:right-0 lg:top-20 lg:h-screen lg:w-1/2">
        <div className="relative flex max-h-screen w-full flex-1 flex-row space-y-10 overflow-y-scroll bg-black px-8 pb-14 lg:mb-40 lg:pb-28">
          <div className="flex w-full justify-center md:px-8 lg:mb-10 lg:pb-10">
            <div className="grid w-fit justify-center gap-5 sm:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:grid-cols-1 lg:pb-8 xl:grid-cols-2">
              {tracksArray.map((track, idx) => (
                <Link href={track.trackPath} key={idx}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TracksPage;
