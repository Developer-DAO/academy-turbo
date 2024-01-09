/* eslint-disable storybook/no-title-property-in-meta */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Meta, StoryObj } from "@storybook/react";

// import ethFamImg from "/eth_fam.png";
import { TrackCard as TrackCardComponent } from "./TrackCard";

const meta = {
  title: "Cards/TrackCard",
  component: TrackCardComponent,
  argTypes: {
    imgSrc: {
      description: "Track Card Image",
      name: "Image Url as relative path",
      defaultValue: "/eth_fam.png",
    },
    tags: {
      description: "Tags string array",
      name: "Tags string array",
      defaultValue: ["Beginner", "Web3", "DeFi"],
    },
    title: {
      description: "Card title",
      name: "Card title",
      defaultValue: "Card title example",
    },
    author: {
      description: "Author",
      name: "Author",
      defaultValue: "wolovim",
    },
    description: {
      description: "Card description",
      name: "Card description",
      defaultValue: "Card description example",
    },
  },
} satisfies Meta<typeof TrackCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TrackCard: Story = {
  args: {
    imgSrc: "/eth_fam.png",
    author: "wolovim",
    description: "Card description example",
    tags: ["Beginner", "Web3", "DeFi"],
    title: "Card title example",
  },
};
