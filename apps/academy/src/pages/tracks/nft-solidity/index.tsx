import Link from "next/link";
import React from "react";
import { TrackCard } from "ui";

import TracksLayout from "@/components/TracksLayout";

const IntroToEthereumPage = () => {
  const tracksArray = [
    {
      title: "TierNFTs.",
      author: "_7i7o, meowy, piablo", // ["_7i7o", "meowy", "piablo"],
      imgPath: "/image16.png",
      description:
        "Create your first ERC721 tiered NFT collection with an array of dev tools with probing quizzes along the way. Adapt your project for professional use cases.",
      tags: ["Beginner", "Web3", "NFT"],
      path: "/tracks/nft-solidity/1",
    },
    {
      title: "Write Automated Tests for your TierNFT.",
      author: "brianfive, piablo",
      imgPath: "/image16.png",
      description:
        "Learn Test Driven Development from the best. A crucial skill for Solidity developers. A necessity in blockchain eco-systems. Your automated tests keep us safe.",
      tags: ["Beginner", "Web3", "NFT"],
      path: "/tracks/nft-solidity/1",
    },
    {
      title: "Connect your Smart Contract to a Front End Application.",
      author: "ropats16, piablo",
      imgPath: "/image16.png",
      description:
        "Learn to seamlessly integrate your smart contracts with a user friendly front-end interface, utilising web3 libraries. With engaging quizzes along the way.",
      tags: ["Beginner", "Web3", "NFT"],
      path: "/tracks/nft-solidity/1",
    },
  ];
  return (
    <div className="relative m-10 flex lg:mx-60 lg:mb-40 lg:mt-40">
      <TracksLayout
        trackTitle="NFT Track"
        trackDescription="Multi Tiered NFTs: A User-Friendly Guide to Building ERC721 Collections"
        trackAuthor="_7i7o, meowy, piablo, georgemac510, mveve"
        trackAuthorDescription="Authors are active Developer DAO members"
        trackAuthorTwitter="@_7i7o.eth"
        tags={["Beginner", "Web3", "Eth"]}
      >
        <div className="mt-14 flex flex-col gap-8 lg:w-full lg:flex-row lg:gap-10 lg:p-20">
          {tracksArray.map((track, idx) => (
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
