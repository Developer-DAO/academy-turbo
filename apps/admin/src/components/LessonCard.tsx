import Link from "next/link";
import { useSession } from "next-auth/react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui";

import { api, type RouterOutputs } from "@/utils/api";

function LessonCard(props: { lesson: RouterOutputs["lessons"]["getAll"][number] }) {
  const { data: session } = useSession();
  const { lesson } = props;
  const utils = api.useContext();

  const deletePost = api.lessons.delete.useMutation({
    onSettled: async () => {
      await utils.lessons.invalidate();
    },
  });

  return (
    <div className="flex flex-row rounded-lg bg-white p-4 transition-all hover:scale-[101%]">
      <Avatar className="mr-2 self-center">
        <AvatarImage src={lesson.imgPath} alt="track banner" />
        <AvatarFallback>{lesson.lessonTitle}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold">{lesson.lessonTitle}</h2>
        <span className="mt-2 text-sm">{lesson.lessonDescription}</span>
      </div>
      <Dialog>
        <div className="flex flex-col">
          <DialogTrigger asChild>
            <Button variant="primary" data-testid={`delete-track-${lesson.lessonTitle}`}>
              Delete
            </Button>
          </DialogTrigger>
          <div className="mt-2 ">
            <Link href={`/lessons/${lesson.id}/edit`}>
              <Button variant="primary" data-testid={`edit-track-${lesson.lessonTitle}`}>
                Edit
              </Button>
            </Link>
          </div>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Track</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this track? This action cannot be reverted.
          </DialogDescription>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="default"
                disabled={!session}
                onClick={() => {
                  deletePost.mutate({ lessonId: lesson.id });
                }}
              >
                Confirm Deletion
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button variant="primary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LessonCard;
