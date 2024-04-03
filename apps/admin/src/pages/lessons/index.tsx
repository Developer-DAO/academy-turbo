import React from "react";

import { LessonsTable } from "@/components/tables/lessons-tables/LessonsTable";
import { api } from "@/utils/api";

function AdminLessonsPage() {
  const { data: lessons } = api.lessons.getAll.useQuery();

  return (
    <main className="container mx-auto py-16">
      {/* <h1 className="text-center text-2xl text-white">Lessons List</h1> */}

      {lessons !== undefined && lessons.length > 1 ? <LessonsTable data={lessons} /> : null}
    </main>
  );
}

export default AdminLessonsPage;
