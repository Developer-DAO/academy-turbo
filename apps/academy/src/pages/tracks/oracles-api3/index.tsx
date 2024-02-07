import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TrackCard } from "ui";

import Spinner from "@/components/Spinner";
import TracksLayout from "@/components/TracksLayout";
import { api } from "@/utils/api";

const OraclesApi3TrackPage = () => {
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
  //     title: "Oracles and API3 - Price Feeds",
  //     author: "BillyJitsu", // ["_7i7o", "piablo"],
  //     imgPath: "/image16.png",
  //     description:
  //       "Learn how oracles play a vital role in bringing offchain data to the blockchain. The data we will be refering to in course is Price Feeds",
  //     tags: ["Infra", "Oracles", "API3"],
  //     path: "/tracks/oracles-api3/1",
  //   },
  //   {
  //     title: "Understanding Quantum Random Number Generation (QRNG) in API3",
  //     author: "BillyJitsu", // ["_7i7o", "piablo"],
  //     imgPath: "/image16.png",
  //     description:
  //       "Comprehensive overview of Quantum Random Number Generation, its scientific basis, and its critical role in enhancing blockchain security and reliability",
  //     tags: ["Infra", "Oracles", "API3"],
  //     path: "/tracks/oracles-api3/2",
  //   },
  //   {
  //     title: "Exploring Airnode",
  //     author: "BillyJitsu", // ["_7i7o", "meowy", "piablo"],
  //     imgPath: "/image16.png",
  //     description:
  //       "Exploration: Airnode allows API providers to autonomously run their own oracle nodes without intensive management or technical expertise",
  //     tags: ["Infra", "Oracles", "API3"],
  //     path: "/tracks/oracles-api3/3",
  //   },
  // ];

  // const allLessonsData = lessonsArray;

  return (
    <div className="relative m-10 flex lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle="Learn How API3 Brings Data Onchain in Web3"
        trackDescription="Using API3 technology to solve blockchain problems with oracles"
        trackAuthor="BillyJitsu"
        trackAuthorDescription="Active Developer DAO member"
        trackAuthorTwitter="wc49358"
        tags={["Infra", "Oracles", "API3"]}
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

export default OraclesApi3TrackPage;
