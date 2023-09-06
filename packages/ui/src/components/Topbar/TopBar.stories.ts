/* eslint-disable storybook/no-title-property-in-meta */
import type { Meta, StoryObj } from "@storybook/react";

import { type NavItem, TopBar as TopBarComponent } from "./TopBar";

const sampleMenus: NavItem[] = [
  {
    name: "Fundamentals",
    href: "/",
    icon: "clarity_blocks",
  },
  {
    name: "Tracks",
    href: "/",
    icon: "vector",
  },
  {
    name: "Community",
    href: "/",
    icon: "dd_logo",
  },
];

const meta = {
  title: "UI/TopBar",
  component: TopBarComponent,
  argTypes: {
    menus: {
      defaultValue: sampleMenus,
      description: "Top bar component",
      name: "TopBar",
    },
  },
} satisfies Meta<typeof TopBarComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopBar: Story = {
  args: {
    menus: sampleMenus,
  },
};
