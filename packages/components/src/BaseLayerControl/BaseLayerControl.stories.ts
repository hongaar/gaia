import type { Meta, StoryObj } from "@storybook/react";

import { BaseLayerControl } from "./BaseLayerControl.js";

const meta = {
  title: "Map/BaseLayerControl",
  component: BaseLayerControl,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Map>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
