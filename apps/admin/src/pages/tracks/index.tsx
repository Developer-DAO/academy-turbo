import { api } from "utils/api";

import TrackCard from "@/components/TrackCard";

export default function AdminTracksPage() {
  const { data: tracks } = api.tracks.getAll.useQuery();

  return (
    <main className="container mx-auto py-16">
      <div className="mx-auto mt-4 flex max-w-xl flex-col gap-4">
        {tracks?.map((track) => <TrackCard key={track.id} track={track} />)}
      </div>
    </main>
  );
}
