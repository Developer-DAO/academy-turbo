import type { FunctionComponent, PropsWithChildren } from "react";
import { Footer } from "ui";

import { Header } from "@/components/Header";

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
