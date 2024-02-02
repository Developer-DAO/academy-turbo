import Image from "next/image";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { type NavItem, SideBar, TopBar } from "ui";

import { ConnectButton } from "@/components/ConnectButton";

const sampleMenus: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: "clarity_blocks",
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
  const router = useRouter();
  const { pathname } = router;

  return (
    <header className="app-container absolute left-0 right-0 top-0 z-50 flex items-center justify-between md:flex-row">
      <div className="hidden lg:flex ">
        {pathname === "/" || pathname === "/tracks" ? (
          <TopBar menus={sampleMenus} />
        ) : (
          <div className="flex items-center justify-around gap-36 text-white lg:flex lg:justify-between lg:gap-5 lg:self-stretch">
            <div className="lg:ml-8 lg:flex lg:basis-[0%] lg:flex-col lg:items-stretch">
              <button
                onClick={() => {
                  router.back();
                }}
                className="flex flex-col items-center justify-center text-white"
              >
                <h2 className="font-future lg:text-xl">Back</h2>
                <Image
                  src={"/back.png"}
                  alt="turn back"
                  width={45}
                  height={30}
                  className="hidden lg:block lg:rotate-180"
                />
              </button>
            </div>
          </div>
        )}
      </div>
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
    </header>
  );
};

export { PageHeader as Header };
