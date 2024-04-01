import CreateLessonForm from "@/components/form/CreateLessonForm";

const CreateLessonPage = () => {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-center text-2xl text-white">Create New Lesson</h1>
      <CreateLessonForm />
    </main>
  );
};

export default CreateLessonPage;
