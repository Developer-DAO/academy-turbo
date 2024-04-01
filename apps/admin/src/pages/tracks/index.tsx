import { useRouter } from "next/router";
import { Button } from "ui";
import { api } from "utils/api";

import TrackCard from "@/components/TrackCard";

export default function AdminTracksPage() {
  const { data: tracks } = api.tracks.getAll.useQuery();
  const router = useRouter();

  const handleCreateNewBtnClick = async () => {
    await router.push("tracks/create");
  };

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-center text-2xl text-white">Tracks List</h1>
      <div className="mb-4 flex w-full justify-end">
        <Button onClick={handleCreateNewBtnClick}>Create New Track</Button>
      </div>
      <div className="mx-auto mt-4 flex max-w-xl flex-col gap-4">
        {tracks?.map((track) => <TrackCard key={track.id} track={track} />)}
      </div>
    </main>
  );
}
