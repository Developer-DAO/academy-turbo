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
    },
  ];
  return (
    <div className="relative mx-60 mb-40 mt-40 flex  ">
      <div className="w-[50%] border text-white">TracksPage Background Image</div>
      <div className="w-[50%] p-20">
        {tracksArray.map((track, idx) => (
          <Link href="/tracks/intro-to-ethereum" key={idx}>
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
  );
};

export default TracksPage;
