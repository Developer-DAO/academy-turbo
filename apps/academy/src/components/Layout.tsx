import type { FunctionComponent, PropsWithChildren } from "react";

import { Header } from "@/components/Header";

import { Footer } from "./Footer";

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
