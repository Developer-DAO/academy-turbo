import localFont from "next/font/local";
// import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";
import type { FunctionComponent, PropsWithChildren } from "react";
import { Footer } from "ui";

// import { EmailRequestDialog } from "@/components/EmailRequestDialog";
// import { EmailVerificationDialog } from "@/components/EmailVerificationDialog";
import { Header } from "@/components/Header";
// import { api } from "@/utils/api";

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
  // const router = useRouter();
  // const { pathname } = router;
  // const [requestEmail, setRequestEmail] = useState(false);
  // const [emailAlreadySent, setEmailAlreadySent] = useState(false);

  // const [requestVerification, setRequestVerification] = useState(false);

  // const { status, data: sessionData } = useSession();

  // const { data: userEmailData, refetch: refetchGetUSerEMailData } = api.user.getUserEmail.useQuery(
  //   sessionData?.user.id!,
  //   {
  //     enabled: sessionData?.user.id !== null && sessionData?.user.id !== undefined,
  //   },
  // );

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     const fetchGetUserEmailData = async () => {
  //       await refetchGetUSerEMailData();
  //     };
  //     void fetchGetUserEmailData();
  //   }
  // }, [status]);

  // useEffect(() => {
  //   if (
  //     status === "authenticated" &&
  //     typeof userEmailData?.email === "string" &&
  //     (userEmailData.emailVerified === null || userEmailData.emailVerified === undefined)
  //   ) {
  //     setRequestVerification(true);
  //     setEmailAlreadySent(userEmailData.emailSent === true ? true : false);
  //   } else if (
  //     status === "authenticated" &&
  //     userEmailData?.email === null &&
  //     userEmailData.emailVerified === null &&
  //     userEmailData.emailSent !== undefined
  //   ) {
  //     setRequestEmail(true);
  //     setEmailAlreadySent(userEmailData.emailSent || false);
  //   }
  // }, [userEmailData, status]);

  return (
    <>
      {/* <EmailRequestDialog
        open={requestEmail}
        setIsOpen={() => {
          setRequestEmail(false);
        }}
        setRequestVerification={setRequestVerification}
      />
      {userEmailData?.verificationNumber !== null &&
      userEmailData?.verificationNumber !== undefined &&
      userEmailData.email !== null &&
      userEmailData.email !== undefined ? (
        <EmailVerificationDialog
          open={requestVerification}
          setIsOpen={() => {
            setRequestVerification(false);
          }}
          verificationCodeNumber={userEmailData.verificationNumber.toString()}
          emailAlreadySent={emailAlreadySent}
          emailAddress={userEmailData.email}
        />
      ) : null} */}
      <Header />
      <main className={fontVars}>{children}</main>
      <Footer />
    </>
  );
};
