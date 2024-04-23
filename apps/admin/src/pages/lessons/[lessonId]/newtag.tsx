import React from "react";

import AddTagToLessonForm from "@/components/form/AddTagToLessonForm";
import { Layout } from "@/components/Layout";

function NewTagPage() {
  return (
    <Layout>
      <section className="container mx-auto py-16">
        <h1 className="text-center text-2xl ">Add new tag </h1>
        <AddTagToLessonForm />
      </section>
    </Layout>
  );
}

export default NewTagPage;
