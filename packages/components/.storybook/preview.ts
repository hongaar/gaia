import type { Preview } from "@storybook/react";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "normalize.css";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      toc: true,
      source: {
        state: "open",
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
