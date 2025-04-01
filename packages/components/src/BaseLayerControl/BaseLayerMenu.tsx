import { Menu, MenuItem } from "@blueprintjs/core";
import React from "react";
import { type BaseLayer } from "./baseLayers.js";

interface BaseLayerMenuProps {
  /**
   * Array of base layers to be displayed in the control.
   */
  baseLayers: BaseLayer[];

  /**
   * Initial base layer to be displayed when the control is rendered.
   */
  currentBaseLayer: BaseLayer;

  /**
   * Callback function that is called when the base layer changes.
   */
  setCurrentBaseLayer: (layer: BaseLayer) => void;
}

export function BaseLayerMenu({
  baseLayers,
  currentBaseLayer,
  setCurrentBaseLayer,
}: BaseLayerMenuProps) {
  return (
    <Menu>
      {baseLayers.map((layer) => (
        <MenuItem
          icon={layer.icon}
          key={layer.id}
          text={layer.title}
          shouldDismissPopover={false}
          onClick={() => {
            setCurrentBaseLayer(layer);
          }}
          active={currentBaseLayer.id === layer.id}
        />
      ))}
    </Menu>
  );
}
