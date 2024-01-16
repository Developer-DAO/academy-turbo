import Link from "next/link";
import React from "react";
import { TrackCard } from "ui";

import TracksLayout from "@/components/TracksLayout";

const IntroToEthereumPage = () => {
  const lessonsArray = [
    {
      title: "Command Line Interface (CLI) Basics: A Beginners Guide",
      author: "elPiablo",
      imgPath: "/image16.png",
      description:
        "Whether you call your CLI a Linux terminal, Mac console, or Windows command prompt, you'll learn navigation, file handling, and essential commands for efficient development",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/fundamentals/cli_lesson",
    },
    {
      title: "Package Manager Basics: Installing NPM with NVM",
      author: "georgemac510",
      imgPath: "/image16.png",
      description:
        "A step-by-step guide for setting up NPM using NVM on Linux, MacOS, and WSL2. Choose your OS and configure Node.js for streamlined development",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/fundamentals/install-npm",
    },
    {
      title: "Understanding Web3 Wallets",
      author: "elPiablo",
      imgPath: "/image16.png",
      description:
        "Delve into Web3 wallet variants and grasp essential concepts, including public and private keys, and security best practices as a developer",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/fundamentals/wallets",
    },
    {
      title: "Essential RPC Concepts for dApp Connectivity",
      author: "georgemac510",
      imgPath: "/image16.png",
      description:
        "Connect dApps to testnets/live blockchains with Web3 wallets and RPC endpoint providers. Learn vital RPC concepts",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/fundamentals/connect-with-rpc",
    },
    {
      title: "Testing… test, test, testnets. Why they matter in Web3",
      author: "elPiablo",
      imgPath: "/image16.png",
      description:
        "Discover the crucial role of testnets in Web3. Developers, understand why and how to fulfill your responsibilities for secure development",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/fundamentals/testnets",
    },
    {
      title: "Basics of OpenZeppelin Smart Contracts",
      author: "elPiablo",
      imgPath: "/image16.png",
      description:
        "Check out the foundations of OpenZeppelin contracts for robust and secure smart contract development in the web3 ecosystem",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/fundamentals/open_zeppelin",
    },
    {
      title: "ERC-? Demystifying Token Standards in Web3",
      author: "elPiablo",
      imgPath: "/image16.png",
      description:
        "What are ERC token standards in Web3? From fungible to NFTs and beyond, explore the Lego-like interoperability of decentralized networks",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/fundamentals/token-standards",
    },
    {
      title: "Decentralized Storage Protocols",
      author: "georgemac510, pbillingsby",
      imgPath: "/image16.png",
      description:
        "A quick dive into decentralized storage with Arweave and IPFS/Filecoin - innovative protocols for secure and reliable data storage in web3",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/fundamentals/decentralized-storage",
    },
    {
      title: "Top IDEs for Efficient Coding",
      author: "georgemac510",
      imgPath: "/image16.png",
      description:
        "Popular Code Editors: Key Considerations for choosing an enjoyable programming toolkit",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/fundamentals/code-editors",
    },
    {
      title: "NFT Hosting on OpenSea and Rarible",
      author: "georgemac510",
      imgPath: "/image16.png",
      description:
        "What is NFT hosting on OpenSea and Rarible? Learn about showcasing and trading various digital assets in the dynamic world of NFTs",
      tags: ["Beginner", "Web3", "DeFi"],
      path: "/tracks/fundamentals/nft-hosting",
    },
  ];
  return (
    <div className="relative m-10 flex lg:mx-60 lg:mb-40 lg:mt-40">
      <TracksLayout
        trackTitle="Web3 Fundamentals Track"
        trackDescription="Access our Web3 Fundamentals offering, providing vital tools, infrastructure insights, and core concepts essential for developers. Cover CLI basics, NPM setup, wallet nuances, RPC connectivity, testnet significance, OpenZeppelin contracts, ERC token standards, decentralized storage protocols, preferred IDEs, and NFT hosting. Fundamental skills for practical project development."
        trackAuthor="elPiablo, georgemac510"
        trackAuthorDescription="The authors have a wealth of knowledge in the field of education and pedagogy"
        trackAuthorTwitter="@GeorgeMac510, @Skruffster"
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
