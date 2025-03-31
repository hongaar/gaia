import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";
import { Map } from "../Map/Map.js";
import { BaseLayerControl } from "./BaseLayerControl.js";
import { OsmRaster, OsmVector } from "./baseLayers.js";

const meta = {
  title: "Map/BaseLayerControl",
  component: BaseLayerControl,
  decorators: [
    (Story, args) => (
      <Map
        mapStyle={args.args.baseLayers?.[0]?.style}
        additionalControls={<Story {...args} />}
      />
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof BaseLayerControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnlyRaster: Story = {
  args: {
    baseLayers: [OsmRaster],
  },
};

export const OnlyVector: Story = {
  args: {
    baseLayers: [OsmVector],
  },
};

export const CustomBaseLayer: Story = {
  args: {
    baseLayers: [
      OsmRaster,
      OsmVector,
      {
        id: "osm-demo",
        title: "OpenStreetMap (demo)",
        icon: "presentation",
        style: "https://demotiles.maplibre.org/style.json",
      },
    ],
  },
};
