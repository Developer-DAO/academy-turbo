import { useRouter } from "next/router";
import type { FunctionComponent, PropsWithChildren } from "react";
import { Footer } from "ui";

import { Header } from "@/components/Header";

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <Header />
      <main className="">{children}</main>
      {/* {children} */}
      {pathname !== "/tracks" ? <Footer /> : null}
    </>
  );
};
