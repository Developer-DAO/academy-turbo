import localFont from "@next/font/local";
import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
// import { type NavItem, SideBar, TopBar } from "ui";
import { cn } from "ui/lib/utils";

// import { useAccount } from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
// import ThemeToggleButton from "@/components/ThemeToggleButton";

const bttf = localFont({ src: "../../public/fonts/BTTF.ttf" });

// const topbarNavMenus: NavItem[] = [
//   {
//     name: "Fundamentals",
//     href: "/fundamentals",
//     icon: "clarity_blocks",
//   },
//   {
//     name: "Tracks",
//     href: "/tracks",
//     icon: "vector",
//   },
//   {
//     name: "Community",
//     href: "https://handbook.developerdao.com/",
//     icon: "dd_logo",
//   },
// ];

const PageHeader: FunctionComponent = () => {
  // const { isConnected } = useAccount();
  // const router = useRouter();
  // const { pathname } = router;

  return (
    <header className="app-container absolute left-0 right-0 top-0 z-50 flex items-start justify-between px-8 pt-8 md:flex-row">
      <div className="inline-flex w-full justify-end gap-2">
        <ConnectButton />
      </div>
      {/* <div className="flex lg:hidden">
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
      </div> */}
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
