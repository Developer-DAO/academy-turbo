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
      <Button onClick={handleCreateNewBtnClick}>Create New Tag</Button>
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
