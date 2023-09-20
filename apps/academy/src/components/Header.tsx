import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { FunctionComponent } from "react";
import { Container, Navigation } from "ui";

const links = {
  leftLinks: [
    { children: "Features", href: "#features", variant: "text" },
    { children: "Testimonials", href: "#testimonials", variant: "text" },
    { children: "Pricing", href: "#pricing", variant: "text" },
  ],
  rightLinks: [],
} as const;

const PageHeader: FunctionComponent = () => {
  // return <Header {...links} />;
  return (
    <header className="py-10">
      <Container>
        <Navigation {...links} />
        <ConnectButton />
      </Container>
    </header>
  );
};

export { PageHeader as Header };
