import type { FunctionComponent, PropsWithChildren } from "react";

import { TracksHeader } from "@/components/TracksHeader";

export const TracksLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col lg:fixed lg:inset-x-0 lg:top-0">
      <div className="absolute inset-x-0 top-0 z-20">
        <TracksHeader />
      </div>
      {children}
    </div>
  );
};
