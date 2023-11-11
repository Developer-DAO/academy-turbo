import type { FunctionComponent, PropsWithChildren } from "react";
import { Footer } from "ui";

import Navbar from "@/components/Navbar";

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
