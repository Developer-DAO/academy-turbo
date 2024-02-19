import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { TrackCard } from "ui";

import PageSeoLayout from "@/components/PageSeoLayout";
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

  return (
    <div className="relative m-10 flex lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle="Build a Tiered NFT"
        trackDescription="This ERC-721 NFT track will take you from complete beginner to building a series of meaningful, real-world, NFT projects. You'll enhance your skills along the way by using test-driven development to gain confidence that your smart contracts are safe to deploy to a live blockchain. And finally you'll be creating a tasteful front-end interface so your users can mint your ERC-721 tokens in their desired tier. All in all, a rewarding coding journey."
        trackAuthor="7i7o, piablo, georgemac510, brianfive, ropats16, meowy, mveve"
        trackAuthorImage="/authors/default.png"
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

NftSolidityTrackPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="NFT Track Page"
      description="This ERC-721 NFT track will take you from complete beginner to building a series of meaningful, real-world, NFT projects. You'll enhance your skills along the way by using test-driven development to gain confidence that your smart contracts are safe to deploy to a live blockchain. And finally you'll be creating a tasteful front-end interface so your users can mint your ERC-721 tokens in their desired tier. All in all, a rewarding coding journey."
    >
      {page}
    </PageSeoLayout>
  );
};

export default NftSolidityTrackPage;
