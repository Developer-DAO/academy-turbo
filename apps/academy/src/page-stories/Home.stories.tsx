import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "@/components/Header";
import Home from "@/pages/index";

const meta: Meta<typeof Home> = {
  component: Home,
  decorators: [
    (Story) => (
      <>
        <Header />
        <Story />
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
