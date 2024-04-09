import { api } from "utils/api";

import { Layout } from "@/components/Layout";
import { TracksTable } from "@/components/tables/tracks-table/TracksTable";

export default function AdminTracksPage() {
  const { data: tracks } = api.tracks.getAll.useQuery();

  return (
    <Layout>
      <section className="container mx-auto py-16">
        <h1 className="text-center text-2xl ">Tracks List</h1>
        <div className="mx-10  mt-4 flex flex-col gap-4 ">
          {tracks !== undefined && tracks.length > 1 ? <TracksTable data={tracks} /> : null}
        </div>
      </section>
    </Layout>
  );
}
