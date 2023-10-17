import type { FunctionComponent } from "react";
import { type NavItem, TopBar } from "ui";

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
  // return <Header {...links} />;
  return (
    <header className="main-container flex items-center justify-between py-10">
      <TopBar menus={sampleMenus} />
      <ConnectButton />
    </header>
  );
};

export { PageHeader as Header };
