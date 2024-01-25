import localFont from "@next/font/local";
import { useRouter } from "next/router";
import type { FunctionComponent, PropsWithChildren } from "react";
import { Footer } from "ui";

import { Header } from "@/components/Header";

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
  return (
    <>
      <Header />
      <main className={fontVars}>{children}</main>
      {pathname !== "/tracks" ? <Footer /> : null}
    </>
  );
};
