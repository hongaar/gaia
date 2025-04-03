import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Map } from "../Map/Map.js";
import { Marker } from "./Marker.js";

const meta = {
  title: "Marker/Marker",
  component: Marker,
  decorators: [
    (Story, { args }) => (
      <Map
        initialCenter={{ lng: 5.387, lat: 52.156 }}
        initialZoom={6}
        style={{ minHeight: "100vh" }}
        additionalControls={<Story {...args} />}
      />
    ),
  ],
  argTypes: {},
  args: {
    location: { lng: 5.387, lat: 52.156 },
  },
} satisfies Meta<typeof Marker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tooltip: Story = {
  args: {
    tooltip: <div>Tooltip content</div>,
  },
};
