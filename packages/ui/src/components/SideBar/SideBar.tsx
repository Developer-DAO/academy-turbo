import NextLink from "next/link";
import type { FC } from "react";

import { Icons } from "../Icons";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

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
      <SheetTrigger asChild className="text-[#44AF96]">
        <Icons.hamburger_menu className="h-8 w-8" />
      </SheetTrigger>
      <SheetContent position="left" className="w-full bg-black pt-12">
        <div className="gap-4 pt-12">
          {menus.map((menu, key) => (
            <div key={key} className="mobile-nav-item">
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
