import CreateTrackForm from "@/components/form/CreateTrackForm";

const CreateTrackPage = () => {
  return (
    <main className="container mx-auto py-16">
      <h1 className="text-center text-2xl text-white">Create New Track</h1>
      <CreateTrackForm />
    </main>
  );
};

export default CreateTrackPage;
