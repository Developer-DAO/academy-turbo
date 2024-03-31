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

function AdminLessonsPage() {
  const { data: lessons } = api.lessons.getAll.useQuery();

  const router = useRouter();

  const handleEditLessonBtnClick = async (lessonId: string) => {
    await router.push(`/lessons/${lessonId}/edit`);
  };

  const handleCreateNewBtnClick = async () => {
    await router.push("lessons/create");
  };

  return (
    <main className="container mx-auto py-16">
      <Button onClick={handleCreateNewBtnClick}>Create New Lesson</Button>
      <Table className="text-white">
        <TableCaption>Full list of availables lessons.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Lesson Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Lesson Path</TableHead>
            <TableHead>Quiz filename</TableHead>
            <TableHead>Order N°</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons?.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell className="font-medium">{lesson.id}</TableCell>
              <TableCell>{lesson.lessonTitle}</TableCell>
              <TableCell>{lesson.lessonDescription}</TableCell>
              <TableCell>{lesson.lessonPath}</TableCell>
              <TableCell>{lesson.quizFileName}</TableCell>
              <TableCell>{lesson.order}</TableCell>
              <TableCell className="text-right">
                <Button variant="default" onClick={async () => handleEditLessonBtnClick(lesson.id)}>
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

export default AdminLessonsPage;
