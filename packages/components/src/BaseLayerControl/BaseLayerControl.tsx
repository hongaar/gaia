import { Classes, Icon, Popover } from "@blueprintjs/core";
import type { ControlPosition } from "maplibre-gl";
import { useRControl } from "maplibre-react-components";
import React from "react";
import { createPortal } from "react-dom";
import {
  type BaseLayer,
  baseLayers as defaultBaseLayers,
} from "./baseLayers.js";

export interface BaseLayerControlProps<T extends BaseLayer = BaseLayer> {
  position?: ControlPosition;
  baseLayers?: T[];
  layerId?: T["id"];
  onChange?: (layerId: T["id"]) => void;
}

export function BaseLayerControl<T extends BaseLayer = BaseLayer>({
  position = "top-right",
  baseLayers = defaultBaseLayers as T[],
  layerId,
  onChange,
}: BaseLayerControlProps<T>) {
  const { container } = useRControl({
    position,
  });

  return createPortal(
    <Popover
      interactionKind="click"
      popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      placement="left"
      content={<div>menu</div>}
    >
      <div class="maplibregl-ctrl maplibregl-ctrl-group">
        <button
          class="maplibregl-ctrl-zoom-in"
          type="button"
          title="Zoom in"
          aria-label="Zoom in"
          aria-disabled="false"
        >
          <span class="maplibregl-ctrl-icon" aria-hidden="true"></span>
        </button>
        <button
          class="maplibregl-ctrl-zoom-out"
          type="button"
          title="Zoom out"
          aria-label="Zoom out"
          aria-disabled="false"
        >
          <span class="maplibregl-ctrl-icon" aria-hidden="true"></span>
        </button>
        <button
          class="maplibregl-ctrl-compass"
          type="button"
          title="Reset bearing to north"
          aria-label="Reset bearing to north"
        >
          <span
            class="maplibregl-ctrl-icon"
            aria-hidden="true"
            style="transform: scale(1) rotateZ(0deg) rotateX(0deg) rotateZ(0deg);"
          ></span>
        </button>
      </div>
      <button
        className="maplibregl-ctrl-zoom-out"
        type="button"
        title="Base layer"
      >
        <Icon icon="map" />
      </button>
      <button
        className="maplibregl-ctrl-zoom-out"
        type="button"
        title="Base layer"
      >
        <Icon icon="map" />
      </button>
    </Popover>,
    container,
  );
}
