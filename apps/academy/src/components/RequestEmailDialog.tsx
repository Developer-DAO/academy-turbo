import { type Dispatch, type SetStateAction, useState } from "react";
import { Button, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "ui";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "ui";
import { Input } from "ui";
import { Label } from "ui";
import { useToast } from "ui";

import { api } from "@/utils/api";

interface Props {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function RequestEmailDialog({ open, setIsOpen }: Props) {
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState("");
  const [saveBtnClicked, setSaveBtnClicked] = useState(false);
  const [showInputOtp, setShowInputOtp] = useState(false);
  const [numberToVerify, setNumberToVerify] = useState("");

  const { mutate: saveUserEmail, data: userData } = api.user.addEmail.useMutation({
    onSuccess: () => {
      toast({
        title: "Amazing!",
        description: "Now Check your inbox to verify your email address",
      });
      setSaveBtnClicked(true);
      const timer = setTimeout(() => {
        setShowInputOtp(true);
      }, 350);
      return () => {
        clearTimeout(timer);
      };
    },
  });

  const handleSaveBtnClick = (e: any) => {
    e.preventDefault();
    if (userEmail !== "") {
      saveUserEmail(userEmail);
    }
  };

  const handleVerifyVerificationNumber = () => {
    console.log("handleVerifyVerificationNumber");
    if (userData?.verificationNumber !== null && userData?.verificationNumber !== undefined) {
      const verificationCorrect = Number(numberToVerify) === userData.verificationNumber;
      if (verificationCorrect) {
        // TODO: mutate save emailVerificated field with the date verified - trigger the toast inside the onSuccess callback from the mutation
        toast({
          title: "Email verified!",
          description:
            "Thank you so much for verifying you email address, keep learning now. Enjoy!",
        });
        setIsOpen(false);
      } else {
        //TODO: what to do? resend another email with another number?
      }
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
          <DialogTitle className="text-3xl text-[#44AF96]">
            {showInputOtp ? "Insert the verification code sent" : "Configure your email"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex h-fit flex-col gap-10">
          <div className="flex flex-col gap-10">
            <Label htmlFor="collaborators" className="text-left text-sm text-[#999999]">
              Your email address will be used to receive notifications about updates, join the
              frens!
            </Label>
            {showInputOtp ? (
              <InputOTP maxLength={6} onChange={(val) => { setNumberToVerify(val); }}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            ) : (
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
            )}
          </div>
        </div>
        <DialogFooter className="w-full justify-end">
          {showInputOtp ? (
            <Button
              variant="primary"
              disabled={numberToVerify.length !== 6}
              onClick={handleVerifyVerificationNumber}
              className="disabled:bg-gray-600 disabled:hover:bg-gray-500"
            >
              Verify Email
            </Button>
          ) : !saveBtnClicked ? (
            <Button
              variant="primary"
              disabled={!userEmail}
              onClick={handleSaveBtnClick}
              className="disabled:bg-gray-600 disabled:hover:bg-gray-500"
            >
              Save
            </Button>
          ) : (
            <Label htmlFor="collaborators" className="w-full text-center text-sm text-[#999999]">
              You will receive a verification email, check your inbox!
            </Label>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
