import { useRouter } from "next/router";
import React from "react";

import { Layout } from "@/components/Layout";
import { LessonsContributorsTable } from "@/components/tables/lessons-contributors-table/LessonsContributorsTable";
import { api } from "@/utils/api";

function LessonContributorsPage() {
  const router = useRouter();
  const lessonId = router.query["lessonId"];

  const { data: lesson } = api.lessons.getLessonsById.useQuery({
    lessonId: lessonId as string,
  });

  return (
    <Layout>
      <section className="container mx-auto max-h-[80vh] py-16">
        {lesson !== undefined && lesson !== null ? (
          <LessonsContributorsTable data={lesson.contributors} />
        ) : null}
      </section>
    </Layout>
  );
}

export default LessonContributorsPage;
