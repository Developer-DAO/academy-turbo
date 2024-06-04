import { api } from "utils/api";

import { Layout } from "@/components/Layout";
import { TracksTable } from "@/components/tables/tracks-table/TracksTable";

export default function AdminTracksPage() {
  const { data: tracks } = api.tracks.getAll.useQuery();

  return (
    <Layout>
      <section className="container mx-auto py-16">
        {tracks !== undefined && tracks.length > 1 ? <TracksTable data={tracks} /> : null}
      </section>
    </Layout>
  );
}
