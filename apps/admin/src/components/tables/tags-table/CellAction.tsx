import type { Lessons } from "database";
// import { User } from "@/constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  useToast,
} from "ui";

import { AlertModal } from "@/components/AlertModal";
import { api } from "@/utils/api";

interface CellActionProps {
  data: Lessons;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const utils = api.useContext();

  const deleteLesson = api.tags.delete.useMutation({
    onSettled: async () => {
      await utils.tags.invalidate();
      setOpen(false);
    },
    onError: (error) => {
      console.log("request error ", { error });
    },
    onSuccess: () => {
      // router.push(`/lessons`); // TODO: redirect to the tracks page where the user clicked the button
      toast({
        variant: "default",
        title: "Tag deleted",
        description: "The tag entry was deleted from the database !!",
      });
    },
  });

  const onConfirm = () => {
    try {
      setLoading(true);
      deleteLesson.mutate({ tagId: data.id });
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
          <Button variant="default" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              router.push(`/tags/${data.id}`);
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
