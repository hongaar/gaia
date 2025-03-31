import { Classes, Icon, Popover } from "@blueprintjs/core";
import type { ControlPosition } from "maplibre-gl";
import { useMap, useRControl } from "maplibre-react-components";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { BaseLayerMenu } from "./BaseLayerMenu.js";
import { builtinBaseLayers, type BaseLayer } from "./baseLayers.js";

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

export function BaseLayerControl({
  position = "top-right",
  baseLayers = builtinBaseLayers,
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
      interactionKind="click"
      popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      placement="left"
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
      <button
        className="maplibregl-ctrl-zoom-out"
        type="button"
        title={currentBaseLayer.title}
      >
        <Icon icon={currentBaseLayer.icon} />
      </button>
    </Popover>,
    container,
  );
}
