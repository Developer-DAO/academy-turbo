import localFont from "next/font/local";
import { useRouter } from "next/router";
import { type FunctionComponent, type PropsWithChildren,useEffect, useState } from "react";
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

  const { data: userEmailData } = api.user.getUserEmail.useQuery();

  useEffect(() => {
    if (userEmailData) {
      if (userEmailData.email === null) {
        setRequestEmail(true);
      }
    }
  }, [userEmailData]);

  return (
    <>
      <RequestEmailDialog open={requestEmail} setIsOpen={() => { setRequestEmail(false); }} />
      <Header />
      <main className={fontVars}>{children}</main>
      {pathname !== "/tracks" && pathname !== "/fundamentals" ? <Footer /> : null}
    </>
  );
};
