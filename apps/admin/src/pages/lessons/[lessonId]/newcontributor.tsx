import React from "react";

import AddContributorToLessonForm from "@/components/form/AddContributorToLessonForm";
import { Layout } from "@/components/Layout";

function newcontributor() {
  return (
    <Layout>
      <section className="container mx-auto py-16">
        <h1 className="text-center text-2xl ">Add new contributor </h1>
        <AddContributorToLessonForm />
      </section>
    </Layout>
  );
}

export default newcontributor;
