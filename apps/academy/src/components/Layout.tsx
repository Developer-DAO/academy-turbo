import localFont from "next/font/local";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { type FunctionComponent, type PropsWithChildren, useEffect, useState } from "react";
import { Footer } from "ui";

import { EmailRequestDialog } from "@/components/EmailRequestDialog";
import { EmailVerificationDialog } from "@/components/EmailVerificationDialog";
import { Header } from "@/components/Header";
import { api } from "@/utils/api";

const bttf = localFont({
  src: "../../public/fonts/BTTF.ttf",
  variable: "--font-future",
});
const deathstar = localFont({
  src: "../../public/fonts/DeathStar.otf",
  variable: "--font-deathstar",
});
const andale = localFont({
  src: "../../public/fonts/ANDALEMO.ttf",
  variable: "--font-andale-mono",
});

const fontVars = `${bttf.variable} ${deathstar.variable} ${andale.variable}`;

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const [requestEmail, setRequestEmail] = useState(false);
  const [emailAlreadySent, setEmailAlreadySent] = useState(false);
  const [verificationCodeNumber, setVerificationCodeNumber] = useState<number>();
  const [emailAddress, setEmailAddress] = useState("");

  const [requestVerification, setRequestVerification] = useState(false);

  const { status, data: sessionData } = useSession();

  const { data: userEmailData, refetch: refetchGetUSerEMailData } = api.user.getUserEmail.useQuery(
    sessionData?.user.id!,
    {
      enabled: sessionData?.user.id !== null && sessionData?.user.id !== undefined,
    },
  );

  useEffect(() => {
    if (status === "authenticated") {
      const fetchGetUserEmailData = async () => {
        await refetchGetUSerEMailData();
      };
      void fetchGetUserEmailData();
    }
  }, [status]);

  useEffect(() => {
    if (
      status === "authenticated" &&
      typeof userEmailData?.email === "string" &&
      (userEmailData.emailVerified === null || userEmailData.emailVerified === undefined)
    ) {
      const fetchGetUserEmailData = async () => {
        await refetchGetUSerEMailData();
      };
      void fetchGetUserEmailData();
      setVerificationCodeNumber(userEmailData.verificationNumber!);
      setEmailAddress(userEmailData.email);
      setRequestVerification(true);
      setEmailAlreadySent(userEmailData.emailSent === true ? true : false);
    } else if (
      status === "authenticated" &&
      userEmailData?.email === null &&
      userEmailData.emailVerified === null &&
      userEmailData.emailSent !== undefined
    ) {
      const fetchGetUserEmailData = async () => {
        await refetchGetUSerEMailData();
      };
      void fetchGetUserEmailData();
      setRequestEmail(true);
      setEmailAlreadySent(userEmailData.emailSent || false);
    }
  }, [userEmailData, status]);

  return (
    <>
      <EmailRequestDialog
        open={requestEmail}
        setIsOpen={() => {
          setRequestEmail(false);
        }}
        setRequestVerification={setRequestVerification}
      />
      <EmailVerificationDialog
        open={requestVerification}
        setIsOpen={setRequestVerification}
        verificationCodeNumber={verificationCodeNumber!}
        emailAlreadySent={emailAlreadySent}
        emailAddress={emailAddress}
      />
      <Header />
      <main className={fontVars}>{children}</main>
      {pathname !== "/tracks" && pathname !== "/fundamentals" ? <Footer /> : null}
    </>
  );
};
