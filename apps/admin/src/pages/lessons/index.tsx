import React from "react";

import { Layout } from "@/components/Layout";
import { LessonsTable } from "@/components/tables/lessons-tables/LessonsTable";
import { api } from "@/utils/api";

function AdminLessonsPage() {
  const { data: lessons } = api.lessons.getAll.useQuery();

  return (
    <Layout>
      <section className="container mx-auto py-16">
        {lessons !== undefined && lessons.length > 1 ? <LessonsTable data={lessons} /> : null}
      </section>
    </Layout>
  );
}

export default AdminLessonsPage;
