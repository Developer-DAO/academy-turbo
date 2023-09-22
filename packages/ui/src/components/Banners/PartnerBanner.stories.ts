/* eslint-disable storybook/no-title-property-in-meta */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Meta, StoryObj } from "@storybook/react";

import { PartnerBanner as PartnerBannerComponent } from "./PartnerBanner";

const meta = {
  title: "Banners/PartnerBanner",
  component: PartnerBannerComponent,
  argTypes: {
    href: {
      description: "CTA url",
      name: "CTA url to be passed to the reach out button",
      defaultValue: "",
    },
    imgSrc: {
      description: "Partner Image",
      name: "Partner Image Url as relative path",
      defaultValue: "",
    },
  },
} satisfies Meta<typeof PartnerBannerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PartnerBanner: Story = {
  args: {
    href: "",
    imgSrc: "",
  },
};
