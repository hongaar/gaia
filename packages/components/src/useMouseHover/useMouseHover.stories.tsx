import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";
import { Demo } from "./Demo.js";
import { TooltipDemo } from "./TooltipDemo.js";
import { useMouseHover } from "./useMouseHover.js";

const meta = {
  title: "hooks/useMouseHover",
  component: Demo,
  argTypes: {
    ref: {
      control: false,
      description: "Pass the HTML element as a RefObject",
    },
    onMouseEnter: {
      control: false,
      description: "Callback function for mouse enter event",
    },
    onMouseLeave: {
      control: false,
      description: "Callback function for mouse leave event",
    },
    timeout: {
      control: {
        type: "number",
      },
      description: "Duration before onMouseLeave is called",
    },
  },
  args: {
    ref: undefined,
    onMouseEnter: fn(),
    onMouseLeave: fn(),
    timeout: 0,
  },
} satisfies Meta<typeof useMouseHover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Timeout: Story = {
  args: {
    timeout: 1000,
  },
};

export const Tooltip: Story = {
  render: (args) => <TooltipDemo {...args} />,
  args: {
    timeout: 500,
  },
};
