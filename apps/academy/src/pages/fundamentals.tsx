import type { FC } from "react";
import React from "react";
import { TrackCard } from "ui";

const Fundamentals: FC = () => {
  const trackCards = Array.from({ length: 10 }).map(() => ({
    imgSrc: "/eth_fam.png",
  }));

  return (
    <div className="flex min-h-screen w-full flex-col space-y-10 bg-black lg:flex-row">
      <div
        className="flex h-full min-h-screen flex-1 flex-col items-center justify-between 
bg-[url('/fundamental-bg.jpeg')] bg-cover bg-no-repeat object-center pt-[300px] md:pt-[325px] lg:fixed lg:inset-y-0 lg:w-1/2"
      >
        <div>
          <h2 className="text-bttf text-5xl text-white">Fundamentals</h2>
        </div>
        <div>
          <p className="text-3xl font-bold text-white">Nail the basics and then take on a track.</p>
        </div>
        <div />
      </div>
      <div className="h-full lg:fixed lg:right-0 lg:top-20 lg:h-screen lg:w-1/2">
        <div className="flex min-h-screen w-full flex-1 flex-col space-y-10 overflow-y-scroll bg-black px-8 pb-28 lg:max-h-screen">
          <div className="flex w-full justify-center px-8 pb-10">
            <div className="grid w-fit justify-center gap-x-10 gap-y-8 pb-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {trackCards.map((trackCard, index) => (
                <TrackCard key={index} imgSrc={trackCard.imgSrc} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fundamentals;

{
  /* <div className="flex flex-col w-full min-h-screen bg-black lg:flex-row">
<div
  className="flex h-full min-h-screen flex-1 flex-col items-center justify-between 
bg-[url('/fundamental-bg.jpeg')] bg-cover bg-no-repeat object-center pt-[300px] md:pt-[325px] lg:fixed lg:inset-y-0 lg:w-1/2"
>
  <div>
    <h2 className="text-5xl text-white text-bttf">Fundamentals</h2>
  </div>
  <div>
    <p className="text-3xl font-bold text-white">Nail the basics and then take on a track.</p>
  </div>
  <div />
</div>
<div className="h-full lg:fixed lg:right-0 lg:top-28 lg:h-screen lg:w-1/2">
  <div className="flex flex-col flex-1 w-full max-h-screen px-8 space-y-10 overflow-y-scroll bg-black pb-28">
    <div className="flex justify-center w-full px-8">
      <div className="grid justify-center grid-cols-1 pb-8 w-fit gap-x-10 gap-y-8 xl:grid-cols-2">
        {trackCards.map((trackCard, index) => (
          <TrackCard key={index} imgSrc={trackCard.imgSrc} />
        ))}
      </div>
    </div>
  </div>
</div>
</div> */
}
