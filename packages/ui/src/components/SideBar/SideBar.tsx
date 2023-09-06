import NextLink from "next/link";
import type { FC } from "react";

import { Icons } from "../Icons";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

interface SubNavItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  icon?: string;
  href: string;
  subnavs?: SubNavItem[];
}

export interface SideBarProps {
  menus: Omit<NavItem, "subnavs" | "icon">[];
}

const SideBar: FC<SideBarProps> = ({ menus }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="text-white">
        <Icons.hamburger_menu className="h-8 w-8" />
      </SheetTrigger>
      <SheetContent position="left" className="w-full max-w-sm">
        <SheetHeader className="text-left">
          <SheetTitle className="inline-flex gap-1">
            <Icons.dd_logo /> academy-logo
          </SheetTitle>
        </SheetHeader>
        <div className="text-swagger gap-4 pt-10">
          {menus.map((menu, key) => (
            <div
              key={key}
              className=" mb-3 rounded-lg bg-gray-50 px-3 py-4 text-left font-normal transition duration-200 hover:bg-gray-200 focus:bg-gray-300"
            >
              <NextLink href={menu.href} legacyBehavior passHref>
                {menu.name}
              </NextLink>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { SideBar };
