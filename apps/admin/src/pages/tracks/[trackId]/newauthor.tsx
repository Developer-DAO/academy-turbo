import React from "react";

import AddAuthorToTrackForm from "@/components/form/AddAuthorToTrackForm";
import { Layout } from "@/components/Layout";

function newcontributor() {
  return (
    <Layout>
      <section className="container mx-auto py-16">
        <h1 className="text-center text-2xl ">Add new contributor </h1>
        <AddAuthorToTrackForm />
      </section>
    </Layout>
  );
}

export default newcontributor;
