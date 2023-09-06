/* eslint-disable storybook/no-title-property-in-meta */
import type { Meta, StoryObj } from "@storybook/react";

import { SideBar as SideBarComponent } from "./SideBar";

const sampleMenus = [
  {
    name: "Fundamentals",
    href: "/",
  },
  {
    name: "Tracks",
    href: "/",
  },
  {
    name: "Community",
    href: "/",
  },
];

const meta = {
  title: "UI/SideBar",
  component: SideBarComponent,
  argTypes: {
    menus: {
      description: "Side bar component",
      name: "SideBar",
    },
  },
} satisfies Meta<typeof SideBarComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideBar: Story = {
  args: {
    menus: sampleMenus,
  },
};
