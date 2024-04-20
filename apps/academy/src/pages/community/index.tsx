import React, { Suspense } from "react";

import VideoLink from "@/components/VideoLink";

export default function CommunityPage() {
  const allVideos = [
    "https://www.youtube.com/embed/1OeBpJIstSQ",
    "https://www.youtube.com/embed/QSmtVR0aniI",
    "https://www.youtube.com/embed/mf40WPxuhVM",
    "https://www.youtube.com/embed/z3YL_mjhAe4",
  ];
  return (
    <div className="px-auto relative mt-28 flex h-full w-full justify-center">
      <div className="grid gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-2">
        {allVideos.map((video, idx) => (
          <Suspense key={idx} fallback={<p>Loading video...</p>}>
            <VideoLink video={video} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
