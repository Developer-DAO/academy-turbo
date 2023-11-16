import type { FunctionComponent } from "react";
import { type NavItem, SideBar, TopBar } from "ui";

import { ConnectButton } from "@/components/ConnectButton";

const sampleMenus: NavItem[] = [
  {
    name: "Fundamentals",
    href: "/",
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

const PageHeader: FunctionComponent = () => {
  return (
    <header className="main-container absolute left-0 right-0 top-0 z-50 flex items-center justify-between py-10 md:flex-row-reverse">
      <ConnectButton />
      <div className="flex lg:hidden">
        <SideBar
          menus={[
            ...sampleMenus,
            {
              name: "Get In Touch",
              href: "/",
              icon: "dd_logo",
            },
          ]}
        />
      </div>
      <div className="hidden lg:flex">
        <TopBar menus={sampleMenus} />
      </div>
    </header>
  );
};

export { PageHeader as Header };
