import type { FunctionComponent } from "react";
import { type NavItem, TopBar } from "ui";

import { ConnectButton } from "@/components/ConnectButton";

const sampleMenus: NavItem[] = [
  {
    name: "Fundamentals",
    href: "/fundamentals",
    icon: "clarity_blocks",
  },
  {
    name: "Tracks",
    href: "/",
    icon: "vector",
  },
  {
    name: "Community",
    href: "/",
    icon: "dd_logo",
  },
];

const TracksHeader: FunctionComponent = () => {
  // return <Header {...links} />;
  return (
    <header className="flex w-full items-center pt-10 md:px-5 lg:px-0 lg:pr-20 xl:pr-5">
      <div className="flex flex-1 items-center justify-center">
        <TopBar menus={sampleMenus} />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-xl items-center justify-end 2xl:max-w-2xl">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export { TracksHeader };
