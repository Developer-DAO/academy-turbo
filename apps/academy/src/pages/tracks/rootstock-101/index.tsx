import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { TrackCard } from "ui";

import PageSeoLayout from "@/components/PageSeoLayout";
import Spinner from "@/components/Spinner";
import TracksLayout from "@/components/TracksLayout";
import { api } from "@/utils/api";

const Rootstock101TrackPage = () => {
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
        trackTitle="Rootstock 101: Building Apps with Bitcoin"
        trackDescription="Leverage your Ethereum and Solidity skills to build apps that on Bitcoin."
        trackAuthor="DappaDan"
        trackAuthorImage="/authors/dappadan.jpg"
        trackAuthorDescription="Your Protocol's BFF ❤️  | Helping teams build a better developer experience and have fun doing it."
        trackAuthorTwitter="DAppaDanDev"
        tags={["Beginner", "Bitcoin", "Rootstock"]}
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

Rootstock101TrackPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="Rootstock 101: Building Apps with Bitcoin"
      description="Leverage your Ethereum and Solidity skills to build apps that on Bitcoin."
      openGraph={{
        images: [
          {
            url:
              process.env["NEXT_PUBLIC_VERCEL_URL"] !== undefined
                ? `https://${process.env["NEXT_PUBLIC_VERCEL_URL"]}/meta-images/rootstock-101/rootstock-101.png`
                : "/meta-images/rootstock-101/rootstock-101.png",
            alt: "Rootstock 101: Building Apps with Bitcoin",
          },
        ],
      }}
    >
      {page}
    </PageSeoLayout>
  );
};

export default Rootstock101TrackPage;
