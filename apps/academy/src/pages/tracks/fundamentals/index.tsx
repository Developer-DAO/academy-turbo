import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TrackCard } from "ui";

import Spinner from "@/components/Spinner";
import TracksLayout from "@/components/TracksLayout";
import { api } from "@/utils/api";

const FundamentalsTrackPage = () => {
  const router = useRouter();

  const path = router.pathname;

  const { data: allLessonsData } = api.lessons.getLessonsByTrackPath.useQuery(
    { trackPath: path },
    {
      refetchOnWindowFocus: false,
    },
  );

  // const lessonsArray = [
  //   {
  //     title: "Command Line Interface (CLI) Basics: A Beginners Guide",
  //     author: "elPiablo",
  //     imgPath: "/image16.png",
  //     description:
  //       "Whether you call your CLI a Linux terminal, Mac console, or Windows command prompt, you'll learn navigation, file handling, and essential commands for efficient development",
  //     tags: ["Entry", "CLI", "Bash"],
  //     path: "/tracks/fundamentals/cli_lesson",
  //   },
  //   {
  //     title: "Package Manager Basics: Installing NPM with NVM",
  //     author: "georgemac510",
  //     imgPath: "/image16.png",
  //     description:
  //       "A step-by-step guide for setting up NPM using NVM on Linux, MacOS, and WSL2. Choose your OS and configure Node.js for streamlined development",
  //     tags: ["Entry", "Node", "Bash"],
  //     path: "/tracks/fundamentals/install-npm",
  //   },
  //   {
  //     title: "Understanding Web3 Wallets",
  //     author: "elPiablo",
  //     imgPath: "/image16.png",
  //     description:
  //       "Delve into Web3 wallet variants and grasp essential concepts, including public and private keys, and security best practices as a developer",
  //     tags: ["Web3", "Wallet", "Zerion"],
  //     path: "/tracks/fundamentals/wallets",
  //   },
  //   {
  //     title: "Essential RPC Concepts for dApp Connectivity",
  //     author: "georgemac510",
  //     imgPath: "/image16.png",
  //     description:
  //       "Connect dApps to testnets/live blockchains with Web3 wallets and RPC endpoint providers. Learn vital RPC concepts",
  //     tags: ["Infra", "RPC", "POKT"],
  //     path: "/tracks/fundamentals/connect-with-rpc",
  //   },
  //   {
  //     title: "Testing… test, test, testnets. Why they matter in Web3",
  //     author: "elPiablo",
  //     imgPath: "/image16.png",
  //     description:
  //       "Discover the crucial role of testnets in Web3. Developers, understand why and how to fulfill your responsibilities for secure development",
  //     tags: ["Infra", "Testnet"],
  //     path: "/tracks/fundamentals/testnets",
  //   },
  //   {
  //     title: "Basics of OpenZeppelin Smart Contracts",
  //     author: "elPiablo",
  //     imgPath: "/image16.png",
  //     description:
  //       "Check out the foundations of OpenZeppelin contracts for robust and secure smart contract development in the web3 ecosystem",
  //     tags: ["Solidity", "OpenZep"],
  //     path: "/tracks/fundamentals/open_zeppelin",
  //   },
  //   {
  //     title: "ERC-? Demystifying Token Standards in Web3",
  //     author: "elPiablo",
  //     imgPath: "/image16.png",
  //     description:
  //       "What are ERC token standards in Web3? From fungible to NFTs and beyond, explore the Lego-like interoperability of decentralized networks",
  //     tags: ["Web3", "Tokens", "ERC"],
  //     path: "/tracks/fundamentals/token-standards",
  //   },
  //   {
  //     title: "Decentralized Storage Protocols",
  //     author: "georgemac510, pbillingsby",
  //     imgPath: "/image16.png",
  //     description:
  //       "A quick dive into decentralized storage with Arweave and IPFS/Filecoin - innovative protocols for secure and reliable data storage in web3",
  //     tags: ["Storage", "IPFS", "Arweave"],
  //     path: "/tracks/fundamentals/decentralized-storage",
  //   },
  //   {
  //     title: "Top IDEs for Efficient Coding",
  //     author: "georgemac510",
  //     imgPath: "/image16.png",
  //     description:
  //       "Popular Code Editors: Key Considerations for choosing an enjoyable programming toolkit",
  //     tags: ["Hardware", "IDE"],
  //     path: "/tracks/fundamentals/code-editors",
  //   },
  //   {
  //     title: "NFT Hosting on OpenSea and Rarible",
  //     author: "georgemac510",
  //     imgPath: "/image16.png",
  //     description:
  //       "What is NFT hosting on OpenSea and Rarible? Learn about showcasing and trading various digital assets in the dynamic world of NFTs",
  //     tags: ["Web3", "NFT", "Hosting"],
  //     path: "/tracks/fundamentals/nft-hosting",
  //   },
  // ];

  return (
    <div className="relative m-10 flex lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle="Web3 Fundamentals Track"
        trackDescription="Access our Web3 Fundamentals offering, providing vital tools, infrastructure insights, and core concepts essential for developers. Cover CLI basics, NPM setup, wallet nuances, RPC connectivity, testnet significance, OpenZeppelin contracts, ERC token standards, decentralized storage protocols, preferred IDEs, and NFT hosting. Fundamental skills for practical project development."
        trackAuthor="elPiablo, georgemac510"
        trackAuthorDescription="The authors have a wealth of knowledge in the field of education and pedagogy"
        trackAuthorTwitter="GeorgeMac510, Skruffster"
        tags={["Entry", "Explorer", "Infra", "Blockchain", "Back-end", "Front-end", "Bash", "RPC"]}
      >
        <div className="mt-14 flex flex-col gap-8 lg:grid lg:w-full lg:grid-cols-3 lg:gap-10">
          {allLessonsData !== undefined && allLessonsData.length > 0 ? (
            allLessonsData.map((lesson, idx) => {
              const tagsForThisLesson = lesson.tags.map((tag) => tag.tag.tagName);
              return (
                <Link href={lesson.lessonPath} key={idx}>
                  <TrackCard
                    imgSrc={lesson.imgPath}
                    tags={tagsForThisLesson}
                    title={lesson.lessonTitle}
                    author={lesson.authors}
                    description={lesson.lessonDescription}
                  />
                </Link>
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
      </TracksLayout>
    </div>
  );
};

export default FundamentalsTrackPage;
