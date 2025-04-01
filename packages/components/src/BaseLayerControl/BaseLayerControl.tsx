import { Icon, Popover } from "@blueprintjs/core";
import type { ControlPosition } from "maplibre-gl";
import { useMap, useRControl } from "maplibre-react-components";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { BaseLayerMenu } from "./BaseLayerMenu.js";
import { defaultBaseLayers, type BaseLayer } from "./baseLayers.js";

export interface BaseLayerControlProps {
  /**
   * Position of the control on the map.
   */
  position?: ControlPosition;

  /**
   * Array of base layers to be displayed in the control.
   */
  baseLayers?: BaseLayer[];

  /**
   * Initial base layer to be displayed when the control is rendered.
   */
  initialBaseLayer?: BaseLayer;

  /**
   * Callback function that is called when the base layer changes.
   */
  onChange?: (layer: BaseLayer) => void;
}

/**
 * BaseLayerControl component allows users to switch between different base layers on the map.
 * It provides a button that, when clicked, opens a popover with a list of available base layers.
 * Users can select a base layer from the list, and the map will update to display the selected layer.
 */
export function BaseLayerControl({
  position = "top-right",
  baseLayers = defaultBaseLayers,
  initialBaseLayer,
  onChange,
}: BaseLayerControlProps) {
  if (baseLayers.length === 0) {
    throw new Error(
      "BaseLayerControl: No base layers provided. Please provide at least one base layer.",
    );
  }

  const [currentBaseLayer, setCurrentBaseLayer] = useState(
    initialBaseLayer || baseLayers[0]!,
  );

  const { container } = useRControl({
    position,
  });

  const map = useMap();

  return createPortal(
    <Popover
      interactionKind="hover"
      fill={true}
      placement="left-start"
      content={
        <BaseLayerMenu
          {...{
            baseLayers,
            currentBaseLayer,
            setCurrentBaseLayer: (layer) => {
              setCurrentBaseLayer(layer);
              map.setStyle(layer.style, {
                validate: false,
              });
              onChange?.(currentBaseLayer);
            },
          }}
        />
      }
    >
      <button type="button" title={currentBaseLayer.title}>
        <Icon icon={currentBaseLayer.icon} />
      </button>
    </Popover>,
    container,
  );
}
