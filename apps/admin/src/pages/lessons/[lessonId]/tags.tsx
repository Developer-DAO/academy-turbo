import { useRouter } from "next/router";
import React from "react";

import { Layout } from "@/components/Layout";
import { LessonsTagsTable } from "@/components/tables/lessons-tags-table/LessonsTagsTable";
import { api } from "@/utils/api";

function LessonTagPage() {
  const router = useRouter();
  const lessonId = router.query["lessonId"];

  const { data: lesson } = api.lessons.getLessonsById.useQuery({
    lessonId: lessonId as string,
  });

  return (
    <Layout>
      <section className="container mx-auto max-h-[80vh] py-16">
        {lesson !== undefined && lesson !== null ? <LessonsTagsTable data={lesson.tags} /> : null}
      </section>
    </Layout>
  );
}

export default LessonTagPage;
