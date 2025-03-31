import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Map } from "./Map.js";

const meta = {
  title: "Map/Map",
  component: Map,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onFeatureClick: fn() },
} satisfies Meta<typeof Map>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: "100%", height: "300px" },
  },
};
