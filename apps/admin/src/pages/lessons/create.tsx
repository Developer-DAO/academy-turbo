import CreateLessonForm from "@/components/form/CreateLessonForm";
import { Layout } from "@/components/Layout";

const CreateLessonPage = () => {
  return (
    <Layout>
      <section className="container mx-auto py-16">
        <h1 className="text-center text-2xl ">Create New Lesson</h1>
        <CreateLessonForm />
      </section>
    </Layout>
  );
};

export default CreateLessonPage;
