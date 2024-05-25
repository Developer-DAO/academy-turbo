import localFont from "next/font/local";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { type FunctionComponent, type PropsWithChildren, useEffect, useState } from "react";
import { Footer } from "ui";

import { Header } from "@/components/Header";
import { RequestEmailDialog } from "@/components/RequestEmailDialog";
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
    console.log({ userEmailData });

    if (
      status === "authenticated" &&
      (userEmailData?.email === null || userEmailData?.emailVerified === null)
    ) {
      setRequestEmail(true);
    }
  }, [userEmailData, status]);

  return (
    <>
      <RequestEmailDialog
        open={requestEmail}
        setIsOpen={() => {
          setRequestEmail(false);
        }}
      />
      <Header />
      <main className={fontVars}>{children}</main>
      {pathname !== "/tracks" && pathname !== "/fundamentals" ? <Footer /> : null}
    </>
  );
};
