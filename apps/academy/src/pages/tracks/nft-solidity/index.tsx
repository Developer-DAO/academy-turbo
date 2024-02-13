import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TrackCard } from "ui";

import Spinner from "@/components/Spinner";
import TracksLayout from "@/components/TracksLayout";
import { api } from "@/utils/api";

const NftSolidityTrackPage = () => {
  const router = useRouter();

  const path = router.pathname;

  const { data: allLessonsData, isLoading: allLessonsDataIsLoading } =
    api.lessons.getLessonsByTrackPath.useQuery(
      { trackPath: path },
      {
        refetchOnWindowFocus: false,
      },
    );

  //   {
  //     title: "Introduction to Smart Contract Development with Solidity",
  //     author: "_7i7o, piablo", // ["_7i7o", "piablo"],
  //     imgPath: "/image16.png",
  //     description:
  //       "Beginner-friendly. Create your first Solidity smart contract and learn the fundamentals of blockchain development. Checkpoint quizzes included.",
  //     tags: ["Entry", "Solidiy", "Remix"],
  //     path: "/tracks/nft-solidity/1",
  //   },
  //   {
  //     title: "Crafting a Basic NFT: A Step-by-Step ERC-721 Tutorial for Beginners",
  //     author: "_7i7o, piablo", // ["_7i7o", "piablo"],
  //     imgPath: "/image16.png",
  //     description:
  //       "Use pro developer tools  and libraries to create and host your first ERC-721 NFT, for real world professional projects. Checkpoint quizzes included.",
  //     tags: ["Entry", "ERC-721", "Solidity"],
  //     path: "/tracks/nft-solidity/2",
  //   },
  //   {
  //     title: "TierNFTs.",
  //     author: "_7i7o, meowy, piablo", // ["_7i7o", "meowy", "piablo"],
  //     imgPath: "/image16.png",
  //     description:
  //       "Create your first ERC-721 tiered NFT collection with an array of dev tools with probing quizzes along the way. Adapt your project for professional use cases.",
  //     tags: ["Entry", "Tier-NFT", "SVG"],
  //     path: "/tracks/nft-solidity/3",
  //   },
  //   {
  //     title: "Smart Contracts: Automated Testing and Test-Driven Development (TDD)",
  //     author: "brianfive, piablo",
  //     imgPath: "/image16.png",
  //     description:
  //       "Learn Test Driven Development from the best. A crucial skill for Solidity developers. A necessity in blockchain eco-systems. Your automated tests keep us safe.",
  //     tags: ["Explorer", "JS", "Testing"],
  //     path: "/tracks/nft-solidity/4",
  //   },
  //   {
  //     title: "Connect your Smart Contract to a Front End Application.",
  //     author: "ropats16, piablo",
  //     imgPath: "/image16.png",
  //     description:
  //       "Learn to seamlessly integrate your smart contracts with a user friendly front-end interface, utilising web3 libraries. With engaging quizzes along the way.",
  //     tags: ["Explorer", "UI", "JS"],
  //     path: "/tracks/nft-solidity/5",
  //   },
  // ];
  return (
    <div className="relative m-10 flex lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle="Build a Tiered NFT"
        trackDescription="This ERC-721 NFT track will take you from complete beginner to building a series of meaningful, real-world, NFT projects. You'll enhance your skills along the way by using test-driven development to gain confidence that your smart contracts are safe to deploy to a live blockchain. And finally you'll be creating a tasteful front-end interface so your users can mint your ERC-721 tokens in their desired tier. All in all, a rewarding coding journey."
        trackAuthor="7i7o, piablo, georgemac510, brianfive, ropats16, meowy, mveve"
        trackAuthorDescription="Authors are active Developer DAO members"
        trackAuthorTwitter="7i7o"
        tags={["Entry", "Remix", "Explorer", "Full Stack", "Solidity", "JavaScript"]}
      >
        {!allLessonsDataIsLoading ? (
          <div className="mt-14 flex flex-col gap-8 lg:grid lg:w-full lg:grid-cols-3 lg:gap-10">
            {allLessonsData !== undefined && allLessonsData.length > 0
              ? allLessonsData.map((lesson, idx) => {
                  const tagsForThisLesson = lesson.tags.map((tag) => tag.tag.tagName);
                  return (
                    <Link href={lesson.lessonPath} key={idx} className="mx-auto">
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
              : null}
          </div>
        ) : (
          <div className="w-full items-center justify-center text-center">
            <Spinner />
          </div>
        )}
      </TracksLayout>
    </div>
  );
};

export default NftSolidityTrackPage;
