import Link from "next/link";
import React from "react";
import { TrackCard } from "ui";

import TracksLayout from "@/components/TracksLayout";

const TrackDetailPage = () => {
  const lessonsArray = [
    {
      title: "Python Smart Contract Development for Beginniners, Pt. 1",
      author: "Raza",
      imgPath: "/image16.png",
      description:
        "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet.",
      tags: ["Entry", "Python", "Vyper"],
      path: "/tracks/web3-python/1",
    },
  ];
  return (
    <div className="relative m-10 flex lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle="Python Smart Contract Development for Beginniners"
        trackDescription="Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia."
        trackAuthor="Raza"
        trackAuthorDescription="A coding nerd voyaging into tech. I try to learn and explain complicated shit. I spent most of my time building and breaking stuff. Don't take me too seriously."
        trackAuthorTwitter="razacodes"
        tags={["Entry", "Ethereum", "Python", "Web3.py", "Vyper", "Ape"]}
      >
        <div className="mt-14 flex flex-col gap-8 lg:grid lg:w-full lg:grid-cols-3 lg:gap-10">
          {lessonsArray.map((track, idx) => (
            <Link href={track.path} key={idx}>
              <TrackCard
                imgSrc={track.imgPath}
                tags={track.tags}
                title={track.title}
                author={track.author}
                description={track.description}
              />
            </Link>
          ))}
        </div>
      </TracksLayout>
    </div>
  );
};

export default TrackDetailPage;
