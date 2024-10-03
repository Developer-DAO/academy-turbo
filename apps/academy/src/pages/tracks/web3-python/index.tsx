import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { TrackCard } from "ui";

import PageSeoLayout from "@/components/PageSeoLayout";
import Spinner from "@/components/Spinner";
import TracksLayout from "@/components/TracksLayout";
import { api } from "@/utils/api";

const Web3PythonTrackPage = () => {
  const router = useRouter();

  const path = router.pathname;

  const { data: allLessonsData } = api.lessons.getLessonsByTrackPath.useQuery(
    { trackPath: path },
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="relative flex p-10 lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle="Python Smart Contract Development for Beginniners"
        trackDescription="Prefer Python? This track offers a deep dive into Vyper contract development and complementary tools, including Ape, and web3.py."
        trackAuthor="Raza"
        trackAuthorImage="/authors/raza.jpeg"
        trackAuthorDescription="A coding nerd voyaging into tech. I try to learn and explain complicated shit. I spent most of my time building and breaking stuff. Don't take me too seriously."
        trackAuthorTwitter="razacodes"
        tags={["Entry", "Ethereum", "Python", "Web3.py", "Vyper", "Ape"]}
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

Web3PythonTrackPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="Python Smart Contract Development for Beginniners"
      description="Prefer Python? This track offers a deep dive into Vyper contract development and complementary tools, including Ape, and web3.py."
      openGraph={{
        images: [
          {
            url:
              process.env["NEXT_PUBLIC_VERCEL_URL"] !== undefined
                ? `https://${process.env["NEXT_PUBLIC_VERCEL_URL"]}/meta-images/python-smart-contract-development-for-beginners.png`
                : "/meta-images/python-smart-contract-development-for-beginners.png",
            alt: "Python Smart Contract Development for Beginniners",
          },
        ],
      }}
    >
      {page}
    </PageSeoLayout>
  );
};

export default Web3PythonTrackPage;
