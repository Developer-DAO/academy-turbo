import type { FunctionComponent, PropsWithChildren } from "react";
import { Footer } from "ui";

import { TracksHeader } from "@/components/TracksHeader";

export const TracksLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed inset-x-0 top-0">
      <div className="fixed inset-x-0 top-0 z-20">
        <TracksHeader />
      </div>
      {children}
      <Footer />
    </div>
  );
};
