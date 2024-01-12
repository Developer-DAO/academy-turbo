import Link from "next/link";
import React from "react";
import { TrackCard } from "ui";

const TracksPage = () => {
  const tracksArray = [
    {
      title: "Intro to Ethereum Part I, II & III.",
      author: "wolovim",
      imgPath: "/image16.png",
      description:
        "Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.",
      tags: ["Beginner", "Web3", "DeFi"],
      trackPath: "/tracks/intro-to-ethereum",
    },
    {
      title: "NFT track Part I, II & III.",
      author: "piablo",
      imgPath: "/image16.png",
      description:
        "Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.",
      tags: ["Beginner", "Web3", "DeFi"],
      trackPath: "/tracks/nft-solidity",
    },
    {
      title: "ERC-20 Solidity Track",
      author: "_7i7o, piablo",
      imgPath: "/image16.png",
      description: "Need description for this track",
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
    // <div className="relative mx-60 mb-40 mt-40 flex  ">
    //   <div className="w-[50%] border text-white">TracksPage Background Image</div>
    //   <div className="w-[50%] p-20">
    //     {tracksArray.map((track, idx) => (
    //       <Link href="/tracks/intro-to-ethereum" key={idx}>
    //         <TrackCard
    //           imgSrc={track.imgPath}
    //           tags={track.tags}
    //           title={track.title}
    //           author={track.author}
    //           description={track.description}
    //         />
    //       </Link>
    //     ))}
    //   </div>
    // </div>
    <div className="flex h-full max-h-screen w-full flex-col space-y-10 overflow-hidden bg-black lg:flex-row">
      <div
        className="flex h-full flex-1 flex-col items-center justify-between 
overflow-hidden bg-[url('/fundamental-bg.jpeg')] bg-cover bg-no-repeat object-center pt-[300px] md:pt-[325px] lg:fixed lg:inset-y-0 lg:w-1/2"
      >
        <div>
          <h2 className="text-bttf text-3xl text-white sm:text-5xl">Fundamentals</h2>
        </div>
        <div className="md:hidden" />
        <div className="flex justify-center">
          <p className="max-w-[275px] text-center text-2xl font-bold text-white sm:max-w-xs sm:text-3xl md:max-w-full">
            Nail the basics and then take on a track.
          </p>
        </div>
        <div />
      </div>
      <div className="h-full overflow-hidden lg:fixed lg:right-0 lg:top-20 lg:h-screen lg:w-1/2">
        <div className="flex w-full flex-1 flex-col space-y-10 overflow-hidden overflow-y-scroll bg-black px-8 pb-14 lg:max-h-screen lg:pb-28">
          <div className="flex w-full justify-center overflow-hidden md:px-8 lg:pb-10">
            <div className="grid w-fit justify-center gap-5 overflow-hidden sm:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:grid-cols-1 lg:pb-8 xl:grid-cols-2">
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
