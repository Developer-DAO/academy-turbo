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

  return (
    <div className="relative m-10 flex lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle="Web3 Fundamentals Track"
        trackDescription="Access our Web3 Fundamentals offering, providing vital tools, infrastructure insights, and core concepts essential for developers. Cover CLI basics, NPM setup, wallet nuances, RPC connectivity, testnet significance, OpenZeppelin contracts, ERC token standards, decentralized storage protocols, preferred IDEs, and NFT hosting. Fundamental skills for practical project development."
        trackAuthor="elPiablo, georgemac510"
        trackAuthorImage="/authors/default.png"
        trackAuthorDescription="The authors have a wealth of knowledge in the field of education and pedagogy"
        trackAuthorTwitter="GeorgeMac510, Skruffster"
        tags={["Entry", "Explorer", "Infra", "Blockchain", "Back-end", "Front-end", "Bash", "RPC"]}
      >
        <div className="mt-14 flex flex-col gap-8 lg:grid lg:w-full lg:grid-cols-3 lg:gap-10">
          {allLessonsData !== undefined && allLessonsData.length > 0 ? (
            allLessonsData.map((lesson, idx) => {
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
          ) : (
            <Spinner />
          )}
        </div>
      </TracksLayout>
    </div>
  );
};

export default FundamentalsTrackPage;
