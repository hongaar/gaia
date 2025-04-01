import type { Meta, StoryObj } from "@storybook/react";
import { MapState } from "./MapState.js";

const meta = {
  title: "MapState",
  component: MapState,
  argTypes: {},
  args: {},
} satisfies Meta<typeof MapState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
