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

function TrackCard(props: { track: RouterOutputs["tracks"]["getAll"][number] }) {
  const { data: session } = useSession();
  const { track } = props;
  const utils = api.useContext();

  const deletePost = api.tracks.delete.useMutation({
    onSettled: async () => {
      await utils.tracks.invalidate();
    },
  });

  return (
    <div className="flex flex-row rounded-lg bg-white p-4 transition-all hover:scale-[101%]">
      <Avatar className="mr-2 self-center">
        <AvatarImage src={track.imgPath} alt="track banner" />
        <AvatarFallback>{track.trackName}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold">{track.trackName}</h2>
        <p className="mt-2 text-sm">{track.trackTitle}</p>
        <span className="mt-2 text-sm">{track.trackDescription}</span>
      </div>
      <Dialog>
        <div className="flex flex-col">
          <DialogTrigger asChild>
            <Button variant="primary" data-testid={`delete-track-${track.trackTitle}`}>
              Delete
            </Button>
          </DialogTrigger>
          <div className="mt-2 ">
            <Link href={`/tracks/${track.id}/edit`}>
              <Button variant="primary" data-testid={`edit-track-${track.trackTitle}`}>
                Edit
              </Button>
            </Link>
          </div>
          <div className="mt-2 ">
            <Link href={`/tracks/${track.id}/lessons`}>
              <Button variant="primary" data-testid={`edit-track-${track.trackTitle}`}>
                View Lessons
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
                  deletePost.mutate({ trackId: track.id });
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

export default TrackCard;
