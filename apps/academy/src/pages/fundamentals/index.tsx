import Link from "next/link";
import type { ReactElement } from "react";
import { TrackCard } from "ui";

import PageSeoLayout from "@/components/PageSeoLayout";
import Spinner from "@/components/Spinner";
import { api } from "@/utils/api";

const FundamentalsPage = () => {
  const { data: allLessonsData } = api.lessons.getLessonsByLessonPath.useQuery();

  return (
    <div className="flex h-full w-full flex-col space-y-10 overflow-hidden bg-black lg:h-screen lg:max-h-screen lg:flex-row">
      <div
        className="flex h-full min-h-screen flex-1 flex-col items-center justify-between overflow-hidden 
bg-[url('/bg_fundamentals.png')] bg-cover bg-center bg-no-repeat object-center pt-[300px]  lg:fixed lg:inset-y-0 lg:h-screen lg:w-1/2"
      >
        <div>
          <h2 className="text-bttf text-3xl text-white lg:text-5xl">Fundamentals</h2>
        </div>
        <div className="flex justify-center">
          <p className="max-w-[275px] text-center text-xl font-bold text-white sm:max-w-xs md:max-w-full lg:text-2xl">
            Nail the basics and then take on a track.
          </p>
        </div>
        <div />
      </div>
      <div className="flex-0 flex lg:fixed lg:right-0 lg:top-20 lg:h-screen lg:w-1/2">
        <div className="relative flex max-h-screen w-full flex-1 flex-row space-y-10 overflow-y-scroll bg-black px-8 pb-14 lg:mb-40 lg:pb-28">
          <div className="flex w-full justify-center md:px-2 lg:mb-10 lg:pb-10">
            <div className="grid w-fit justify-center gap-5 sm:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:grid-cols-1 lg:pb-8 xl:grid-cols-2">
              {allLessonsData !== undefined && allLessonsData.length > 0 ? (
                allLessonsData.map((lesson, idx) => (
                  <Link href={lesson.lessonPath} key={idx}>
                    <TrackCard
                      imgSrc={lesson.imgPath}
                      tags={lesson.tags.map((tag) => tag.tag.tagName)}
                      title={lesson.lessonTitle}
                      author={""}
                      description={lesson.lessonDescription}
                    />
                  </Link>
                ))
              ) : (
                <div className="w-full justify-center">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FundamentalsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="Fundamentals Page"
      description=" Nail the basics and then take on a track."
    >
      {page}
    </PageSeoLayout>
  );
};

export default FundamentalsPage;
