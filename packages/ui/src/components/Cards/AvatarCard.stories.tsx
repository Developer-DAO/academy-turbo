/* eslint-disable storybook/no-title-property-in-meta */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Meta, StoryObj } from "@storybook/react";

import { AvatarCard as AvatarCardComponent } from "./AvatarCard";

const meta = {
  title: "Cards/AvatarCard",
  component: AvatarCardComponent,
  argTypes: {
    imgSrc: {
      description: "Avatar Icon Image",
      name: "Avatar Url as relative path",
      defaultValue: "/profile_avatar.png",
    },
  },
} satisfies Meta<typeof AvatarCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvatarCard: Story = {
  args: {
    imgSrc: "/profile_avatar.png",
  },
};
