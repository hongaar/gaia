import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Map } from "../Map/Map.js";
import { LocalStorageProvider } from "./LocalStorageProvider.js";
import { MapState } from "./MapState.js";
import { SearchProvider } from "./SearchProvider.js";

const meta = {
  title: "Map/MapState",
  component: MapState,
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
  args: {},
} satisfies Meta<typeof MapState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Search: Story = {
  args: {
    provider: new SearchProvider(),
  },
};

export const LocalStorage: Story = {
  args: {
    provider: new LocalStorageProvider(),
  },
};
