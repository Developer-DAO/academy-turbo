import { useRouter } from "next/router";
import { type FunctionComponent, type PropsWithChildren, useEffect } from "react";
import { useAccount } from "wagmi";

import Navbar from "@/components/Navbar";

const navMenus: any[] = [
  {
    title: "Tracks",
    href: "/tracks",
    // icon: "vector",
  },
  {
    title: "Lessons",
    href: "/lessons",
    // icon: "clarity_blocks",
  },
  {
    title: "Tags",
    href: "/tags",
    // icon: "",
  },
  {
    title: "Contributors",
    href: "/contributors",
    // icon: "",
  },
];

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { isDisconnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isDisconnected) {
      void router.push("/");
    }
  }, [isDisconnected]);

  return (
    <>
      <Navbar navItems={navMenus} />
      <div className="flex h-screen overflow-hidden">
        <main className="w-full">{children}</main>
      </div>
    </>
  );
};
