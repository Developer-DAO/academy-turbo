import CreateTrackForm from "@/components/form/CreateTrackForm";
import { Layout } from "@/components/Layout";

const CreateTrackPage = () => {
  return (
    <Layout>
      <h1 className="pt-10 text-center text-2xl">Create New Track</h1>
      <CreateTrackForm />
    </Layout>
  );
};

export default CreateTrackPage;
