import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";
import { Map } from "../Map/Map.js";
import { BaseLayerControl } from "./BaseLayerControl.js";
import { allBaseLayers, OsmVector } from "./baseLayers.js";

const meta = {
  title: "Map/BaseLayerControl",
  component: BaseLayerControl,
  decorators: [
    (Story, { args }) => (
      <Map
        style={{ minHeight: "100vh" }}
        baseLayer={args.baseLayers?.[0]}
        additionalControls={<Story {...args} />}
      />
    ),
  ],
  argTypes: {},
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof BaseLayerControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllAvailable: Story = {
  args: {
    baseLayers: allBaseLayers,
  },
};

export const Single: Story = {
  args: {
    baseLayers: [OsmVector],
  },
};

export const CustomBaseLayer: Story = {
  args: {
    baseLayers: [
      {
        id: "osm-demo",
        title: "OpenStreetMap (demo)",
        icon: (
          <img
            style={{ width: "24px", height: "29px" }}
            src="https://wiki.openstreetmap.org/w/images/9/9e/OpenStreetMap_green.svg"
          />
        ),
        style: "https://demotiles.maplibre.org/style.json",
      },
    ],
  },
};
