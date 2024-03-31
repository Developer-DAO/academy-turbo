import localFont from "@next/font/local";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { type NavItem, SideBar, TopBar } from "ui";
import { cn } from "ui/lib/utils";
import { useAccount } from "wagmi";

import { ConnectButton } from "@/components/ConnectButton";

const bttf = localFont({ src: "../../public/fonts/BTTF.ttf" });

const topbarNavMenus: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: "vector",
  },
  {
    name: "Create New Track",
    href: "/tracks/create",
    icon: "clarity_blocks",
  },

  // {
  //   name: "Community",
  //   href: "https://handbook.developerdao.com/",
  //   icon: "dd_logo",
  // },
];

const PageHeader: FunctionComponent = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { pathname } = router;

  return (
    <header className="app-container relative left-0 right-0 top-0 z-50 flex items-start justify-between  px-8 pt-8 md:flex-row">
      <div className="hidden w-full  lg:flex">
        <div className="inline-flex w-full  justify-between gap-2 ">
          {isConnected && pathname !== "/" ? <TopBar menus={topbarNavMenus} /> : null}
          <ConnectButton />
        </div>
      </div>
      <div className="flex lg:hidden">
        {isConnected && pathname !== "/" ? <SideBar menus={[...topbarNavMenus]} /> : null}
        {/* <ConnectButton /> */}
      </div>
    </header>
  );
};

export { PageHeader as Header };

export const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className={cn("flex flex-col items-center justify-center text-white", className)}
    >
      <h2 className={`${bttf.className} lg:text-xl`}>Back</h2>
      <Image src={"/back.png"} alt="turn back" width={35} height={25} className="rotate-180" />
    </button>
  );
};
