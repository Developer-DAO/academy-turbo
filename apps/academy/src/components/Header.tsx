import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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
    href: "/tracks", // hardcoded trackID for now. For the sake of using the dynamic route - 23 nov 2023
    icon: "vector",
  },
  {
    name: "Community",
    href: "/",
    icon: "dd_logo",
  },
];

const PageHeader: FunctionComponent = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <header className="main-container absolute left-0 right-0 top-0 z-50 flex items-center justify-between pt-6 md:flex-row md:pt-0">
      <div className="hidden lg:flex ">
        {pathname === "/" ? (
          <div className="mt-14">
            <TopBar menus={sampleMenus} />
          </div>
        ) : (
          <div className="mt-7 flex items-center justify-around gap-36 text-white lg:mt-8 lg:flex lg:justify-between lg:gap-5 lg:self-stretch">
            <div className="lg:ml-8 lg:flex lg:basis-[0%] lg:flex-col lg:items-stretch">
              <h2 className="font-future lg:text-2xl">Back</h2>
              <Link href="/">
                {/* router.back() */}
                <Image
                  src={"/back.png"}
                  alt="turn back"
                  width={25}
                  height={35}
                  className="rotate-180 lg:hidden"
                />
                <Image
                  src={"/back.png"}
                  alt="turn back"
                  width={50}
                  height={35}
                  className="hidden lg:block lg:rotate-180"
                />
              </Link>
            </div>
          </div>
        )}
      </div>

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
      <ConnectButton />
    </header>
  );
};

export { PageHeader as Header };
