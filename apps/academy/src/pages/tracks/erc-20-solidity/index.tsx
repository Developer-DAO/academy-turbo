import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TrackCard } from "ui";

import Spinner from "@/components/Spinner";
import TracksLayout from "@/components/TracksLayout";
import { api } from "@/utils/api";

const Erc20SolidityTrackPage = () => {
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
  //     title: "Introduction to Smart Contract Development with Solidity",
  //     author: "_7i7o, piablo", // ["_7i7o", "piablo"],
  //     imgPath: "/image16.png",
  //     description:
  //       "Beginner-friendly. Create your first Solidity smart contract and learn the fundamentals of blockchain development. Checkpoint quizzes included.",
  //     tags: ["Beginner", "Solidity", "Remix"],
  //     path: "/tracks/erc-20-solidity/1",
  //   },
  //   {
  //     title: "Your own ERC-20 Token: A Step-by-Step Guide using Foundry",
  //     author: "_7i7o, piablo",
  //     imgPath: "/image16.png",
  //     description:
  //       "Foundry demystified: ERC-20 token creation for beginners. Probing quizzes throughout. Grasp the fundamentals and empower yourself to build and customize.",
  //     tags: ["Beginner", "ERC-20", "Foundry"],
  //     path: "/tracks/erc-20-solidity/2",
  //   },
  // ];
  return (
    <div className="relative m-10 flex lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle="Build a Fungible Token"
        trackDescription="Learn to create ERC-20 tokens using Foundry, progressing from the basics to advanced customisation. We will be exploring, testing, real-world applications, security practices, and the role of tokens in decentralised ecosystems. From DeFi to DAO's and everything in between, thanks to its simplicity, but versatility, the ERC-20 is going nowhere. Start with Solidity, or dive directly into token creation — empowering you to contribute to blockchain projects."
        trackAuthor="_7i7o, piablo"
        trackAuthorDescription="Authors are active Developer DAO members"
        trackAuthorTwitter="@_7i7o.eth, @Skruffster"
        tags={["Beginner", "Solidity", "ERC-20", "Foundry", "DeFi"]}
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

export default Erc20SolidityTrackPage;
