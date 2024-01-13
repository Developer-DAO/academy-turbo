"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import type { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Icons, type NavItem, TopBar } from "ui";

import { ConnectButton } from "@/components/ConnectButton";

export const sampleMenus: NavItem[] = [
  {
    name: "Fundamentals",
    href: "/fundamentals",
    icon: "clarity_blocks",
    subnavs: undefined,
  },
  {
    name: "Tracks",
    href: "/",
    icon: "vector",
    subnavs: undefined,
  },
  {
    name: "Community",
    href: "/",
    icon: "dd_logo",
    subnavs: undefined,
  },
];

interface MenuType {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}

const TracksHeader: FunctionComponent<MenuType> = ({ openMenu, setOpenMenu }: MenuType) => {
  // return <Header {...links} />;
  return (
    <header className="flex w-full flex-row-reverse items-center px-5 pt-10 md:flex-row lg:px-0 lg:pr-20 xl:pr-5">
      <div className="hidden flex-1 items-center justify-center md:flex">
        <TopBar menus={sampleMenus} />
      </div>
      <div className="flex flex-1 items-center justify-end md:hidden">
        <button
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        >
          {openMenu ? (
            <XMarkIcon className="z-20 h-10 w-10 text-[#44AF96]" />
          ) : (
            <Icons.hamburger_menu className="z-20 h-10 w-10 text-[#44AF96]" />
          )}
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-xl items-center md:justify-end 2xl:max-w-2xl">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export { TracksHeader };
