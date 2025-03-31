import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { OsmRaster, OsmVector } from "../BaseLayerControl/baseLayers.js";
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

export const Default: Story = {};

export const NoFullscreen: Story = {
  args: {
    fullscreen: false,
    style: { width: "500px", height: "500px" },
  },
};

export const NoControls: Story = {
  args: {
    navigationControl: false,
    geolocateControl: false,
    scaleControl: false,
    attributionControl: false,
  },
};

export const MapStyleRaster: Story = {
  args: {
    mapStyle: OsmRaster.style,
  },
};

export const MapStyleVector: Story = {
  args: {
    mapStyle: OsmVector.style,
  },
};

export const MapStyleCustom: Story = {
  args: {
    mapStyle: "https://demotiles.maplibre.org/style.json",
  },
};
