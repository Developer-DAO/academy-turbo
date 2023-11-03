import type { FunctionComponent } from "react";
import { Icons,type NavItem, TopBar } from "ui";

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
    <header className="flex w-full flex-row-reverse items-center pt-10 md:flex-row md:px-5 lg:px-0 lg:pr-20 xl:pr-5">
      <div className="hidden flex-1 items-center justify-center md:flex">
        <TopBar menus={sampleMenus} />
      </div>
      <div className="flex flex-1 items-center justify-end">
        <button>
          <Icons.hamburger_menu className="h-10 w-10 text-green-500" />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-xl items-center md:justify-end 2xl:max-w-2xl">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export { TracksHeader };
