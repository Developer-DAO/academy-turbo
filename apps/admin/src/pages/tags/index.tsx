import React from "react";

import { Layout } from "@/components/Layout";
import { TagsTable } from "@/components/tables/tags-table/TagsTable";
import { api } from "@/utils/api";

function AdminTagsPage() {
  const { data: tags } = api.tags.getAll.useQuery();

  return (
    <Layout>
      <section className="container mx-auto py-16">
        <h1 className="text-center text-2xl ">Tags List</h1>

        {tags !== undefined && tags.length > 1 ? <TagsTable data={tags} /> : null}
      </section>
    </Layout>
  );
}

export default AdminTagsPage;
