import localFont from "@next/font/local";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { type NavItem, SideBar, TopBar } from "ui";
import { cn } from "ui/lib/utils";

// import { useAccount } from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
// import ThemeToggleButton from "@/components/ThemeToggleButton";

const bttf = localFont({ src: "../../public/fonts/BTTF.ttf" });

const topbarNavMenus: NavItem[] = [
  {
    name: "Fundamentals",
    href: "/fundamentals",
    icon: "clarity_blocks",
  },
  {
    name: "Tracks",
    href: "/tracks",
    icon: "vector",
  },
  {
    name: "Posts",
    href: "https://blog.developerdao.com/",
    icon: "states",
  },
  {
    name: "Community",
    href: "https://handbook.developerdao.com/",
    icon: "dd_logo",
  },
];

const PageHeader: FunctionComponent = () => {
  // const { isConnected } = useAccount();
  const router = useRouter();
  const { pathname } = router;

  return (
    <header className=" mx-[30px] flex items-center justify-between pt-[30px] md:mx-[45px] md:pt-[20px] ">
      <div className="z-50  hidden lg:block">
        {pathname === "/" || pathname === "/tracks" || pathname === "/fundamentals" ? (
          <div className="flex justify-between">
            <Link href="/">
              <Image src="/academy_logo.svg" width={150} height={40} alt="Academy Logo" />
            </Link>
            {/* <ThemeToggleButton hidden={isConnected} /> */}
          </div>
        ) : (
          <div className="flex items-center justify-around gap-36 text-white lg:flex lg:justify-between lg:gap-5 lg:self-stretch">
            <div className="lg:items-stretch9 lg:ml-8 lg:flex lg:basis-[0%] lg:flex-col">
              <BackButton />
            </div>
          </div>
        )}
      </div>

      <div className={`mx-auto   hidden md:block`}>
        <TopBar menus={topbarNavMenus} pathName={pathname} />
      </div>

      <div>
        {pathname === "/" || pathname === "/tracks" || pathname === "/fundamentals" ? (
          <div className="inline-flex gap-2">
            {/* <ThemeToggleButton hidden={pathname !== "/" && isConnected ? false : true} /> */}
            <ConnectButton />
          </div>
        ) : (
          <>
            <BackButton className="lg:hidden" />
            <div className="hidden gap-2 lg:inline-flex">
              {/* <ThemeToggleButton hidden={pathname !== "/" && isConnected ? false : true} /> */}
              <ConnectButton />
            </div>
          </>
        )}
      </div>
      <div className="flex lg:hidden">
        {pathname === "/" || pathname === "/tracks" || pathname === "/fundamentals" ? (
          <SideBar
            menus={[
              ...topbarNavMenus,
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
