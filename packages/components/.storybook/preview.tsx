import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import type { Preview } from "@storybook/react";
import { createRenderer } from "fela";
import "normalize.css";
import React from "react";
import { RendererProvider } from "react-fela";

const renderer = createRenderer();

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      toc: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, { args }) => (
      <RendererProvider renderer={renderer}>
        <Story {...args} />
      </RendererProvider>
    ),
  ],
};

export default preview;
