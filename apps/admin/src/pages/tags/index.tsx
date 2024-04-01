import { useRouter } from "next/router";
import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";

import { api } from "@/utils/api";

function AdminTagsPage() {
  const { data: tags } = api.tags.getAll.useQuery();

  const router = useRouter();

  const handleEditTagBtnClick = async (tagId: string) => {
    await router.push(`/tags/${tagId}`);
  };

  const handleCreateNewBtnClick = async () => {
    await router.push("tags/create");
  };

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-center text-2xl text-white">Tags List</h1>
      <div className="mb-4 flex w-full justify-end">
        <Button onClick={handleCreateNewBtnClick}>Create New Tag</Button>
      </div>
      <Table className="text-white">
        <TableCaption>Full list of availables tags.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Tag Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags?.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell className="font-medium">{tag.id}</TableCell>
              <TableCell>{tag.tagName}</TableCell>
              <TableCell>{tag.tagDescription}</TableCell>
              <TableCell className="text-right">
                <Button variant="default" onClick={async () => handleEditTagBtnClick(tag.id)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

export default AdminTagsPage;
