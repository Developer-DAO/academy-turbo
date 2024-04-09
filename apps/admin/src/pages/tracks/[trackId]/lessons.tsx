import { useRouter } from "next/router";
import React from "react";
import { Button } from "ui";

import { Layout } from "@/components/Layout";
import LessonCard from "@/components/LessonCard";
import { api } from "@/utils/api";

export default function TrackLessonsPage() {
  const router = useRouter();
  const trackId = router.query["trackId"];

  const { data: lessons } = api.lessons.getLessonsByTrackId.useQuery({
    trackId: trackId as string,
  });

  const handleCreateNewBtnClick = async () => {
    await router.push("/lessons/create");
  };
  return (
    <Layout>
      <h1 className="text-center text-2xl ">Track Lessons List</h1>

      <Button onClick={handleCreateNewBtnClick}>Create New Lesson</Button>

      <div className="mx-auto mt-4 flex max-w-xl flex-col gap-4">
        {lessons?.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} />)}
      </div>
    </Layout>
  );
}
