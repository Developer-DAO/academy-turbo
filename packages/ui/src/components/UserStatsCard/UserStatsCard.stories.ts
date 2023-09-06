/* eslint-disable storybook/no-title-property-in-meta */
import type { Meta, StoryObj } from "@storybook/react";

import { UserStatsCard as UserStatsCardComponent } from "./UserStatsCard";

const meta = {
  title: "UI/UserStatsCard",
  component: UserStatsCardComponent,
} satisfies Meta<typeof UserStatsCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserStatsCard: Story = {};
