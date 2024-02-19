import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { TrackCard } from "ui";

import PageSeoLayout from "@/components/PageSeoLayout";
import Spinner from "@/components/Spinner";
import TracksLayout from "@/components/TracksLayout";
import { api } from "@/utils/api";

const IntroToEthereumTrackPage = () => {
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
        trackTitle="A Developer's Guide to Ethereum"
        trackDescription="An accessible introduction to Ethereum via web3.py and Python. Grasp blockchain basics, Ethereum's decentralization, and smart contracts with practical insights. Code included for hands-on learning, but no programming expertise required."
        trackAuthor="wolovim"
        trackAuthorImage="/authors/wolovim.jpeg"
        trackAuthorDescription="Full-stack developer on the Ethereum Foundation's Python tooling team, helping to maintain web3.py, py-evm, and related open source libraries."
        trackAuthorTwitter="wolovim"
        tags={["Entry", "Open Source", "Blockchain", "Ethereum", "Python", "Web3.py", "Node"]}
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

IntroToEthereumTrackPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="Intro To Ethereum Track Page"
      description="An accessible introduction to Ethereum via web3.py and Python. Grasp blockchain basics, Ethereum's decentralization, and smart contracts with practical insights. Code included for hands-on learning, but no programming expertise required."
    >
      {page}
    </PageSeoLayout>
  );
};

export default IntroToEthereumTrackPage;
