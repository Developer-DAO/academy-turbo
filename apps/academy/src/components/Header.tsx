import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { FunctionComponent } from "react";
import { Container, type NavItem, TopBar } from "ui";

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
    <header className="py-10">
      <Container className="flex justify-between">
        <TopBar menus={sampleMenus} />
        <ConnectButton />
      </Container>
    </header>
  );
};

export { PageHeader as Header };
