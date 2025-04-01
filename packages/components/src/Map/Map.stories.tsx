import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { EsriImagery } from "../BaseLayerControl/baseLayers.js";
import { Map } from "./Map.js";

const meta = {
  title: "Map/Map",
  component: Map,
  argTypes: {},
  args: { style: { minHeight: "100vh" }, onFeatureClick: fn() },
} satisfies Meta<typeof Map>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoFill: Story = {
  args: {
    fill: false,
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

export const SatelliteBaseLayer: Story = {
  args: {
    baseLayer: EsriImagery,
  },
};

export const CustomBaseLayer: Story = {
  args: {
    baseLayer: {
      id: "custom-style",
      title: "Custom Style",
      icon: "presentation",
      style: "https://demotiles.maplibre.org/style.json",
    },
  },
};
