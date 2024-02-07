import localFont from "@next/font/local";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { type NavItem, SideBar, TopBar } from "ui";
import { cn } from "ui/lib/utils";
import { useAccount } from "wagmi";

import { ConnectButton } from "@/components/ConnectButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";

const bttf = localFont({ src: "../../public/fonts/BTTF.ttf" });

const sampleMenus: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: "home_icon",
  },
  {
    name: "Tracks",
    href: "/tracks",
    icon: "vector",
  },
  {
    name: "Community",
    href: "https://handbook.developerdao.com/",
    icon: "dd_logo",
  },
];

const PageHeader: FunctionComponent = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { pathname } = router;

  return (
    <header className="app-container absolute left-0 right-0 top-0 z-50 flex items-start justify-between px-8 pt-8 md:flex-row">
      <div className="hidden lg:flex ">
        {pathname === "/" || pathname === "/tracks" ? (
          <div className="nav-division flex flex-col gap-y-6">
            <div className="flex justify-between">
              <Link href="/">
                <Image src="/academy_logo.svg" width={200} height={40} alt="Academy Logo" />
              </Link>
              {/* <ThemeToggleButton hidden={isConnected} /> */}
            </div>
            <div className="mx-auto">
              <TopBar menus={sampleMenus} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-around gap-36 text-white lg:flex lg:justify-between lg:gap-5 lg:self-stretch">
            <div className="lg:ml-8 lg:flex lg:basis-[0%] lg:flex-col lg:items-stretch">
              <BackButton />
            </div>
          </div>
        )}
      </div>
      {pathname === "/" || pathname === "/tracks" ? (
        <div className="inline-flex gap-2">
          {/* <ThemeToggleButton hidden={pathname !== "/" && isConnected ? false : true} /> */}
          <ConnectButton />
        </div>
      ) : (
        <>
          <BackButton className="lg:hidden" />
          <div className="hidden gap-2 lg:inline-flex">
            <ThemeToggleButton hidden={pathname !== "/" && isConnected ? false : true} />
            <ConnectButton />
          </div>
        </>
      )}
      <div className="flex lg:hidden">
        {pathname === "/" || pathname === "/tracks" ? (
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
        ) : (
          <ConnectButton />
        )}
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
