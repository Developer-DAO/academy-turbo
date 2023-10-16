import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./Footer";

const meta = {
  title: "Layout/Footer",
  component: Footer,
  argTypes: {
    links: {
      description: "The footer navigation links",
      defaultValue: [],
      name: "Footer Links",
      control: {
        type: "array",
      },
    },
    socials: {
      description: "The links to the socials on the footer",
      defaultValue: [],
      name: "Socials",
      control: {
        type: "array",
      },
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    links: [
      { name: "Academy", href: "#features" },
      { name: "Feedback", href: "#testimonials" },
      { name: "Newsletter", href: "#pricing" },
    ],
    socials: [
      { alt: "Github", href: "#features", icon: "github_circle" },
      { alt: "Twitter", href: "#testimonials", icon: "twitter_circle" },
      { alt: "Mirror", href: "#pricing", icon: "mirror_circle" },
    ],
  },
};
