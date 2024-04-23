import CreateContributorForm from "@/components/form/CreateContributorForm";
import { Layout } from "@/components/Layout";

const CreateLessonPage = () => {
  return (
    <Layout>
      <section className="container mx-auto py-16">
        <h1 className="text-center text-2xl ">Create New Contributor</h1>
        <CreateContributorForm />
      </section>
    </Layout>
  );
};

export default CreateLessonPage;
