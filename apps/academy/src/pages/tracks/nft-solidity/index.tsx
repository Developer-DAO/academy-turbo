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
      tags: ["Beginner", "Solidiy", "Remix"],
      path: "/tracks/nft-solidity/1",
    },
    {
      title: "Crafting a Basic NFT: A Step-by-Step ERC721 Tutorial for Beginners",
      author: "_7i7o, piablo", // ["_7i7o", "piablo"],
      imgPath: "/image16.png",
      description:
        "Use pro developer tools  and libraries to create and host your first ERC721 NFT, for real world professional projects. Checkpoint quizzes included.",
      tags: ["Beginner", "NFT", "Solidity"],
      path: "/tracks/nft-solidity/2",
    },
    {
      title: "TierNFTs.",
      author: "_7i7o, meowy, piablo", // ["_7i7o", "meowy", "piablo"],
      imgPath: "/image16.png",
      description:
        "Create your first ERC721 tiered NFT collection with an array of dev tools with probing quizzes along the way. Adapt your project for professional use cases.",
      tags: ["Beginner", "NFT", "Solidity"],
      path: "/tracks/nft-solidity/3",
    },
    {
      title: "Smart Contracts: Automated Testing and Test-Driven Development (TDD)",
      author: "brianfive, piablo",
      imgPath: "/image16.png",
      description:
        "Learn Test Driven Development from the best. A crucial skill for Solidity developers. A necessity in blockchain eco-systems. Your automated tests keep us safe.",
      tags: ["Elementary", "NFT", "Testing"],
      path: "/tracks/nft-solidity/4",
    },
    {
      title: "Connect your Smart Contract to a Front End Application.",
      author: "ropats16, piablo",
      imgPath: "/image16.png",
      description:
        "Learn to seamlessly integrate your smart contracts with a user friendly front-end interface, utilising web3 libraries. With engaging quizzes along the way.",
      tags: ["Elementary", "NFT", "JavaScript"],
      path: "/tracks/nft-solidity/5",
    },
  ];
  return (
    <div className="relative m-10 flex lg:mx-60 lg:mb-40 lg:mt-40">
      <TracksLayout
        trackTitle="NFT Track"
        trackDescription="This ERC-721 NFT track will take you as a being a complete beginner, not only learning the basics of Solidity, but have you building a series of meaningful, real-world, NFT projects, with some nifty approaches on how to code them. You'll enhance your skills along the way, by creating your own Test Driven Development suite to ensure your smart contracts are safe to deploy to a live blockchain. And finally you'll be creating a tasteful front-end interface so your users can mint your ERC-721 tokens in their desired tier. All in all, a rewarding coding journey."
        trackAuthor="7i7o, piablo, georgemac510, brianfive, ropats16, meowy, mveve"
        trackAuthorDescription="Authors are active Developer DAO members"
        trackAuthorTwitter="@_7i7o.eth"
        tags={["Beginner", "Elementary", "Web3", "NFT", "Solidity", "JavaScript", "Hardhat"]}
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
