import localFont from "@next/font/local";
import NextLink from "next/link";
import type { FC } from "react";

import { Icons } from "../../";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

const deathstar = localFont({
  src: "../../font/DeathStar.otf",
  variable: "--font-deathstar",
});

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
      <SheetContent side="left" className="w-full bg-black pt-12 md:max-w-sm">
        <div className="gap-4 pt-12">
          {menus.map((menu, key) => (
            <div key={key} className={`mobile-nav-item ${deathstar.variable}`}>
              <SheetClose asChild>
                <NextLink href={menu.href}>{menu.name}</NextLink>
              </SheetClose>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { SideBar };
