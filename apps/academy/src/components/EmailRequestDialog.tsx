import { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "ui";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "ui";
import { Input } from "ui";
import { Label } from "ui";
import { useToast } from "ui";

import { api } from "@/utils/api";

interface Props {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRequestVerification: Dispatch<SetStateAction<boolean>>;
}

export function EmailRequestDialog({ open, setIsOpen, setRequestVerification }: Props) {
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState("");

  const { mutate: saveUserEmail } = api.user.addEmail.useMutation({
    onSuccess: () => {
      toast({
        title: "Amazing!",
        description: "Now Check your inbox to verify your email address.",
      });
    },
    onError: ({ message }) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description: `Unexpected error: ${message}`,
      });
    },
    onSettled: () => {
      setIsOpen(false);
      setRequestVerification(true);
    },
  });

  const handleSaveBtnClick = (e: any) => {
    e.preventDefault();
    if (userEmail !== "") {
      saveUserEmail(userEmail);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className=" h-fit w-fit gap-10 border-[#44AF96] bg-black"
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
        onPointerDown={(e) => {
          e.preventDefault();
        }}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="gap-2">
          <DialogTitle className="text-3xl text-[#44AF96]">Configure your email</DialogTitle>
        </DialogHeader>
        <div className="flex h-fit flex-col gap-10">
          <div className="flex flex-col gap-10">
            <Label htmlFor="collaborators" className="text-left text-sm text-[#999999]">
              Your email address will be used to receive notifications about updates, join the
              frens!
            </Label>
            <Input
              id="email"
              type="email" //TODO: VALIDATE EMAIL FORMAT VALID EMAIL FORMAT https://ui.shadcn.com/docs/components/input#form
              placeholder="Keep up to date with Academy's updates!"
              className="col-span-3 border-0 bg-[#333333] text-[#999999]"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter className="w-full justify-end">
          <Button
            variant="primary"
            disabled={!userEmail}
            onClick={handleSaveBtnClick}
            className="disabled:bg-gray-600 disabled:hover:bg-gray-500"
            type="button"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
