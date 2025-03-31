import { Icon } from "@blueprintjs/core";
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
    <div>
      {baseLayers.map((layer) => (
        <button
          key={layer.id}
          type="button"
          title={layer.title}
          onClick={() => {
            setCurrentBaseLayer(layer);
          }}
        >
          <Icon icon={layer.icon} />
          {layer.title}
          {currentBaseLayer.id === layer.id && <Icon icon="tick" />}
        </button>
      ))}
    </div>
  );
}
