import Link from "next/link";
import React from "react";
import { TrackCard } from "ui";

import TracksLayout from "@/components/TracksLayout";

const IntroToEthereumPage = () => {
  const tracksArray = [
    {
      title: "Navigating in a CLI for beginners.",
      author: "authors",
      imgPath: "/image16.png",
      description:
        "Learn the basics of using a console/terminal/shell for Ubuntu, Mac and Windows WSL.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "Code Editors (IDEs).",
      author: "authors",
      imgPath: "/image16.png",
      description: "Popular Code Editors (IDEs).",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "Connecting to a Network via RPC.",
      author: "authors",
      imgPath: "/image16.png",
      description: "Connecting to Networks via RPC.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "Decentralized Storage with Arweave and IPFS/Filecoin",
      author: "authors",
      imgPath: "/image16.png",
      description: "Overview on decentralized storage protocols.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "Install NPM Using NVM.",
      author: "authors",
      imgPath: "/image16.png",
      description: "Installing NPM Using NVM for WSL2, MacOS and Ubuntu.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "NFT Hosting on OpenSea and Rarible.",
      author: "authors",
      imgPath: "/image16.png",
      description: "Hosted NFT Collections.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "OpenZeppelin.",
      author: "authors",
      imgPath: "/image16.png",
      description: "Overview of OpenZeppelin Contracts.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "Testnets mini-lesson.",
      author: "authors",
      imgPath: "/image16.png",
      description: "Test, test, test, testnets.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "ERC Token Standards.",
      author: "authors",
      imgPath: "/image16.png",
      description: "Overview and use cases of ERC tokens.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
    {
      title: "Introduction to web3 wallets.",
      author: "authors",
      imgPath: "/image16.png",
      description: "Overview of wallet use cases and setting up environment.",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/intro-to-ethereum/1",
    },
  ];
  return (
    <div className="relative m-10 flex lg:mx-60 lg:mb-40 lg:mt-40">
      <TracksLayout
        trackTitle="Fundamentals Track"
        trackDescription="Fundamentals track page description space, could be oriented to describe better the topics that it contains among other relevating stuff about the different tools/services/programming languages and/or frameworks used or mentioned."
        trackAuthor="authros"
        trackAuthorDescription="authors here is a Full Stack Python Developer at the Ethereum Foundation."
        trackAuthorTwitter="@authors.eth"
        tags={["Beginner", "Web3", "Eth"]}
      >
        <div className="mt-14 flex flex-col gap-8 lg:w-full lg:gap-10 lg:p-20">
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
