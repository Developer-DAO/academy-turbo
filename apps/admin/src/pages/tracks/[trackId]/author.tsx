import { useRouter } from "next/router";
import React from "react";

import { Layout } from "@/components/Layout";
import { TrackAuthorTable } from "@/components/tables/track-author-table/TrackAuthorTable";
import { api } from "@/utils/api";

function TrackAuthorPage() {
  const router = useRouter();
  const trackId = router.query["trackId"];

  const { data: track } = api.tracks.getTrackById.useQuery({
    trackId: trackId as string,
  });

  return (
    <Layout>
      <section className="container mx-auto max-h-[80vh] py-16">
        {track !== undefined && track !== null ? (
          <TrackAuthorTable data={track.contributors} />
        ) : null}
      </section>
    </Layout>
  );
}

export default TrackAuthorPage;
