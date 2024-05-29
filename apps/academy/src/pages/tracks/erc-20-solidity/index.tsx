import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { TrackCard } from "ui";

import PageSeoLayout from "@/components/PageSeoLayout";
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

  return (
    <div className="relative m-10 flex lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle="Build a Fungible Token"
        trackDescription="Learn to create ERC-20 tokens using Foundry, progressing from the basics to advanced customisation. We will be exploring, testing, real-world applications, security practices, and the role of tokens in decentralised ecosystems. From DeFi to DAO's and everything in between, thanks to its simplicity, but versatility, the ERC-20 is going nowhere. Start with Solidity, or dive directly into token creation — empowering you to contribute to blockchain projects."
        trackAuthor="7i7o, piablo"
        trackAuthorImage="/authors/default.png"
        trackAuthorDescription="Authors are active Developer DAO members"
        trackAuthorTwitter="7i7o, Skruffster"
        tags={["Beginner", "Solidity", "ERC-20", "Foundry", "DeFi"]}
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

Erc20SolidityTrackPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="Build a Fungible Token"
      description="Start with Solidity basics, or move straight on to creating an ERC-20 token using the Foundry development toolchain."
      openGraph={{
        images: [
          {
            url:
              process.env["NEXT_PUBLIC_VERCEL_URL"] !== undefined
                ? `https://${process.env["NEXT_PUBLIC_VERCEL_URL"]}/meta-images/build-an-erc20-token.png`
                : "/meta-images/build-an-erc20-token.png",
            alt: "Web3 Learning Tracks",
          },
        ],
      }}
    >
      {page}
    </PageSeoLayout>
  );
};

export default Erc20SolidityTrackPage;
