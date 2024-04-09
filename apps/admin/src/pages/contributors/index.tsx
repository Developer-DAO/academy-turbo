import React from "react";

import { Layout } from "@/components/Layout";
import { ContributorsTable } from "@/components/tables/contributors-table/ContributorsTable";
import { api } from "@/utils/api";

function AdminLessonsPage() {
  const { data: contributors, isLoading, isSuccess } = api.contributors.getAll.useQuery();

  return (
    <Layout>
      <section className="container mx-auto py-16">
        {/* <h1 className="text-center text-2xl ">Lessons List</h1> */}

        {!isLoading && isSuccess ? <ContributorsTable data={contributors} /> : null}
      </section>
    </Layout>
  );
}

export default AdminLessonsPage;
