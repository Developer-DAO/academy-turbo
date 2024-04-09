import type { Tracks } from "database";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Icons,
  useToast,
} from "ui";

import { AlertModal } from "@/components/AlertModal";
import { api } from "@/utils/api";

interface CellActionProps {
  data: Tracks;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const utils = api.useContext();

  const deleteTrack = api.tracks.delete.useMutation({
    onSettled: async () => {
      await utils.tracks.invalidate();
      setOpen(false);
    },
    onError: (error) => {
      console.log("request error ", { error });
    },
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Track deleted",
        description: "The track entry was deleted from the database !!",
      });
    },
  });

  const onConfirm = () => {
    try {
      setLoading(true);
      deleteTrack.mutate({ trackId: data.id });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="text" className="h-8 w-8 border-2 ">
            <span className="sr-only ">Open menu</span>
            <Icons.more_horizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              router.push(`/tracks/${data.id}/edit`);
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
