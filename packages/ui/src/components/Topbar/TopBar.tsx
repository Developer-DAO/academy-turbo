/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import NextLink from "next/link";
import { type FC, Fragment } from "react";

import { Icons } from "../Icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

interface SubNavItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  icon?: string | undefined;
  href: string;
  subnavs?: SubNavItem[] | undefined;
}

export interface TopBarProps {
  menus: NavItem[];
}

const renderSubmenus = (submenus: SubNavItem[]): JSX.Element[] | undefined => {
  return submenus.map((_submenuItem, key) => (
    <Fragment key={key}>
      <NavigationMenuContent>
        <NavigationMenuLink>any</NavigationMenuLink>
      </NavigationMenuContent>
    </Fragment>
  ));
};

const renderMenus = ({ menus }: TopBarProps): JSX.Element[] | undefined => {
  return menus.map((menuItem, key) => (
    <TopBarItem
      name={menuItem.name}
      icon={menuItem.icon}
      href={menuItem.href}
      subnavs={menuItem.subnavs}
      key={key}
    />
  ));
};

const TopBarItem: FC<NavItem> = ({ name, icon, href, subnavs }) => {
  const Icon = icon !== undefined ? Icons[icon] : null;
  return (
    <NavigationMenuItem>
      {name === "Community" ? (
        <a target="_blank" href={href} className={`typography nav ${navigationMenuTriggerStyle()}`}>
          {Icon !== undefined && Icon !== null ? <Icon /> : null}
          {name}
        </a>
      ) : (
        <NextLink href={href} legacyBehavior passHref>
          <NavigationMenuLink className={`typography nav ${navigationMenuTriggerStyle()}`}>
            {Icon !== undefined && Icon !== null ? <Icon /> : null}
            {name}
          </NavigationMenuLink>
        </NextLink>
      )}
      {subnavs ? renderSubmenus(subnavs) : null}
    </NavigationMenuItem>
  );
};

const TopBar: FC<TopBarProps> = ({ menus }) => {
  return (
    <NavigationMenu className="top-nav gradient-blur">
      <NavigationMenuList className="gap-x-4">{renderMenus({ menus })}</NavigationMenuList>
    </NavigationMenu>
  );
};

export { TopBar };
export type { NavItem };
