import { useSession } from "next-auth/react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
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

  const { data: sessionData } = useSession();

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

  const { mutate: saveEmailVerificatedSuccess } = api.user.emailVerificatedSuccess.useMutation({
    onSuccess: () => {
      toast({
        title: "Email verified!",
        description: "Thank you so much for verifying you email address, keep learning now. Enjoy!",
      });
      setIsOpen(false);
    },
  });

  const handleSaveBtnClick = (e: any) => {
    e.preventDefault();
    if (userEmail !== "") {
      saveUserEmail(userEmail);
    }
  };

  const { data: userEmailData } = api.user.getUserEmail.useQuery(sessionData?.user.id!, {
    enabled: sessionData?.user.id !== null && sessionData?.user.id !== undefined,
  });

  const handleVerifyVerificationNumber = () => {
    if (
      (userData !== null &&
        userData !== undefined &&
        userData.verificationNumber !== null &&
        userData.verificationNumber !== undefined) ||
      (userEmailData !== null &&
        userEmailData !== undefined &&
        userEmailData.verificationNumber !== null &&
        userEmailData.verificationNumber !== undefined)
    ) {
      let verificationCorrect = false;
      console.log({ userData });
      console.log({ userEmailData });
      if (
        userData !== null &&
        userData !== undefined &&
        userData.verificationNumber !== null &&
        userData.verificationNumber !== undefined
      ) {
        console.log("111");
        verificationCorrect = Number(numberToVerify) === userData.verificationNumber;
      } else if (
        userEmailData !== null &&
        userEmailData !== undefined &&
        userEmailData.verificationNumber !== null &&
        userEmailData.verificationNumber !== undefined &&
        !verificationCorrect
      ) {
        console.log("222");
        verificationCorrect = Number(numberToVerify) === userEmailData.verificationNumber;
      } else {
        console.log("F3333");
      }

      if (verificationCorrect) {
        saveEmailVerificatedSuccess();
      } else {
        console.log("notttt correct");
        //TODO:  resend another email with another number
      }
    } else {
      console.log("weird else");
    }
  };

  useEffect(() => {
    if (userEmailData?.email !== null && userEmailData?.emailVerified === null) {
      setShowInputOtp(true);
    }
  }, [userEmailData]);

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
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  onChange={(val: string) => {
                    console.log({ val });
                    setNumberToVerify(val);
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="border border-[#44AF96] text-[#44AF96]" />
                    <InputOTPSlot index={1} className="border border-[#44AF96] text-[#44AF96]" />
                    <InputOTPSlot index={2} className="border border-[#44AF96] text-[#44AF96]" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="border border-[#44AF96] text-[#44AF96]" />
                    <InputOTPSlot index={4} className="border border-[#44AF96] text-[#44AF96]" />
                    <InputOTPSlot index={5} className="border border-[#44AF96] text-[#44AF96]" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
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
              type="button"
            >
              Verify Email
            </Button>
          ) : !saveBtnClicked ? (
            <Button
              variant="primary"
              disabled={!userEmail}
              onClick={handleSaveBtnClick}
              className="disabled:bg-gray-600 disabled:hover:bg-gray-500"
              type="button"
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
