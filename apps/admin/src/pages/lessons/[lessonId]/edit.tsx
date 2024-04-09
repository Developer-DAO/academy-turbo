import { useRouter } from "next/router";

import EditLessonForm from "@/components/form/EditLessonForm";
import Spinner from "@/components/Spinner";
import { api } from "@/utils/api";

export default function EditLessonPage() {
  const router = useRouter();
  const lessonId = router.query["lessonId"];
  const {
    data: lessonToEditData,
    isLoading: getLessonByIdIsLoading,
    isSuccess: getLessonByIdIsSuccess,
  } = api.lessons.getLessonsById.useQuery({
    lessonId: lessonId as string,
  });
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-center text-2xl ">Update Lesson</h1>
      {getLessonByIdIsLoading ? (
        <Spinner />
      ) : getLessonByIdIsSuccess && lessonToEditData !== null ? (
        <EditLessonForm lessonToEditData={lessonToEditData} lessonId={lessonId as string} />
      ) : null}
    </main>
  );
}
