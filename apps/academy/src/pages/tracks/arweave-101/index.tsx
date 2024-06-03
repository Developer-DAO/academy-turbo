import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { TrackCard } from "ui";

import PageSeoLayout from "@/components/PageSeoLayout";
import Spinner from "@/components/Spinner";
import TracksLayout from "@/components/TracksLayout";
import { api } from "@/utils/api";

const Arweave101TrackPage = () => {
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
        trackTitle="Arweave 101: Building Apps on Arweave"
        trackDescription="Go from 0 to building on Arweave. Learn what Arweave is, how to acces and store data on Arweave, and how to build permaweb apps and deploy them to Arweave."
        trackAuthor="K"
        trackAuthorImage="/authors/k4y1s.jpg"
        trackAuthorDescription="I'm a developer trying to break down complex concepts for the rest of us. I'm not smarter than you; I just have more time for research. Web and open-source enthusiast 💚"
        trackAuthorTwitter="K4y1s"
        tags={["Beginner", "Arweave", "Storage"]}
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

Arweave101TrackPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="Arweave 101: Building Apps on Arweave"
      description="Go from 0 to building on Arweave. Learn what Arweave is, how to acces and store data on Arweave, and how to build permaweb apps and deploy them to Arweave."
      openGraph={{
        images: [
          {
            url:
              process.env["NEXT_PUBLIC_VERCEL_URL"] !== undefined
                ? `https://${process.env["NEXT_PUBLIC_VERCEL_URL"]}/meta-images/arweave-101/building-apps-on-arweave.png`
                : "/meta-images/arweave-101/building-apps-on-arweave.png",
            alt: "A Developer's Guide to Ethereum",
          },
        ],
      }}
    >
      {page}
    </PageSeoLayout>
  );
};

export default Arweave101TrackPage;
