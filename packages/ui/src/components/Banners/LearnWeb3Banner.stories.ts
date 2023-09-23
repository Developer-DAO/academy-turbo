/* eslint-disable storybook/no-title-property-in-meta */
import type { Meta, StoryObj } from "@storybook/react";

import { LearnWeb3Banner as LearnWeb3BannerComponent } from "./LearnWeb3Banner";

const meta = {
  title: "Banners/LearnWeb3Banner",
  component: LearnWeb3BannerComponent,
  argTypes: {
    href: {
      description: "CTA url",
      name: "CTA url to be passed to the get started button",
      defaultValue: "",
    },
  },
} satisfies Meta<typeof LearnWeb3BannerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LearnWeb3Banner: Story = {
  args: {
    href: "",
  },
};
