import type { Meta, StoryObj } from "@storybook/react";

import EmptyStatePage from "./emptystate.page";

const meta: Meta<typeof EmptyStatePage> = {
  component: EmptyStatePage,
  decorators: [
    (Story) => (
      <>
        <Story />
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
