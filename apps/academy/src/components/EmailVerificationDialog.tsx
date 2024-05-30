import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Button, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "ui";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "ui";
import { Label } from "ui";
import { useToast } from "ui";

import { api } from "@/utils/api";

interface Props {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  emailAlreadySent: boolean;
  verificationCodeNumber: number;
  emailAddress: string;
}

export function EmailVerificationDialog({
  open,
  setIsOpen,
  emailAlreadySent,
  verificationCodeNumber,
  emailAddress,
}: Props) {
  const { toast } = useToast();
  const [numberToVerify, setNumberToVerify] = useState("");
  const [timer, setTimer] = useState("2:00");
  const [allowNewEmail, setAllowNewEmail] = useState(false);

  const { mutate: saveEmailVerificatedSuccess } = api.user.emailVerificatedSuccess.useMutation({
    onSuccess: () => {
      toast({
        title: "Email verified!",
        description: "Thank you so much for verifying you email address, keep learning now. Enjoy!",
      });
      setIsOpen(false);
    },
  });

  const { mutate: resendCodeVerificationEmail } = api.user.resendCodeVerificationEmail.useMutation({
    onSuccess: () => {
      toast({
        title: "Email Resent!",
        description: "Check your email inbox for the new email with the verificacion code.",
      });
      // setIsOpen(false);
    },
  });

  useEffect(() => {
    if (!emailAlreadySent) {
      countdown();
    }
  }, []);

  const handleRequestResendEmail = () => {
    resendCodeVerificationEmail(emailAddress);
    countdown();
  };

  const handleVerifyVerificationNumber = () => {
    const verificationCorrect = Number(numberToVerify) === Number(verificationCodeNumber);

    if (verificationCorrect) {
      saveEmailVerificatedSuccess();
    } else {
      console.log("notttt correct");
      //TODO:  resend another email with another number
      setAllowNewEmail(true);
    }
  };

  function countdown() {
    // clearInterval(interval);
    const interval = setInterval(function () {
      const time = timer.split(":");
      let minutes = Number(time[0]);
      let seconds = Number(time[1]);
      let secondsSTR = seconds.toString();
      seconds -= 1;
      secondsSTR = seconds.toString();
      if (minutes < 0) return;
      else if (seconds < 0 && minutes != 0) {
        minutes -= 1;
        seconds = 59;
        secondsSTR = seconds.toString();
      } else if (seconds < 10 && seconds.toString().length != 2) {
        secondsSTR = "0" + seconds.toString();
      }

      setTimer(minutes.toString() + ":" + secondsSTR);

      if (minutes == 0 && seconds == 0) {
        setAllowNewEmail(true);
        clearInterval(interval);
      }
    }, 1000);
  }

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
            Insert the verification code sent
          </DialogTitle>
        </DialogHeader>
        <div className="flex h-fit flex-col gap-10">
          <div className="flex flex-col gap-10">
            <Label htmlFor="collaborators" className="text-left text-sm text-[#999999]">
              Your email address will be used to receive notifications about updates, join the
              frens!
            </Label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                onChange={(val: string) => {
                  setNumberToVerify(val);
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    autoFocus={true}
                    index={0}
                    className="border border-[#44AF96] text-[#44AF96]"
                  />
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
          </div>
        </div>
        <DialogFooter className="flex w-full">
          <div className="flex w-full justify-between">
            <div className="flex flex-col justify-center">
              <span className="text-sm text-[#44AF96]">
                Haven&apos;t received your email? Please check your spam folder, otherwise request
                another code below
              </span>
              {allowNewEmail ? (
                <span className="h-fit w-fit border-[#44AF96] text-xs text-[#44AF96]">
                  {`You can request new email in a moment. `}
                </span>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleRequestResendEmail}
                  className="h-fit w-fit !border !border-[#44AF96] !bg-black !text-xs !text-[#44AF96] hover:!border-black hover:!bg-[#44AF96] hover:!text-black"
                  type="button"
                >
                  Resend email
                </Button>
              )}
            </div>
            <div>
              <Button
                variant="primary"
                disabled={numberToVerify.length !== 6}
                onClick={handleVerifyVerificationNumber}
                className="!border !border-black !bg-[#44AF96] !text-xl !text-black hover:!cursor-pointer hover:!border-[#44AF96] hover:!bg-black hover:!text-[#44AF96] disabled:bg-gray-600 disabled:hover:bg-gray-500"
                type="button"
              >
                Verify Email
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
