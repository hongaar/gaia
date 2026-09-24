import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
    "intro",
    "architecture",
    "using-gaia",
    {
      type: "category",
      label: "Guides",
      items: ["guides/publishing", "guides/consuming", "guides/components"],
    },
    {
      type: "category",
      label: "Reference",
      items: ["reference/components"],
    },
    "spec",
  ],
};

export default sidebars;
