import { useRouter } from "next/router";
import React from "react";

import { Layout } from "@/components/Layout";
import { LessonsTable } from "@/components/tables/lessons-tables/LessonsTable";
import { api } from "@/utils/api";

export default function TrackLessonsPage() {
  const router = useRouter();
  const trackId = router.query["trackId"];

  const { data: lessons } = api.lessons.getLessonsByTrackId.useQuery({
    trackId: trackId as string,
  });

  return (
    <Layout>
      <section className="container mx-auto py-16">
        {lessons !== undefined && lessons.length > 1 ? <LessonsTable data={lessons} /> : null}
      </section>
    </Layout>
  );
}
