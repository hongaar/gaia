import { BlueprintProvider } from "@blueprintjs/core";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  RAttributionControl,
  RGeolocateControl,
  RMap,
  RNavigationControl,
  RScaleControl,
} from "maplibre-react-components";
import React from "react";
import { Osm, type BaseLayer } from "../BaseLayerControl/baseLayers.js";
import {
  DEFAULT_BEARING,
  DEFAULT_CENTER,
  DEFAULT_PITCH,
  DEFAULT_ZOOM,
  type Location,
} from "./const.js";

export interface MapProps {
  /**
   * Base layer to be used in the map.
   */
  baseLayer?: BaseLayer;

  /**
   * Initial center of the map.
   */
  initialCenter?: Location;

  /**
   * Initial zoom level of the map.
   */
  initialZoom?: number;

  /**
   * Initial pitch of the map.
   */
  initialPitch?: number;

  /**
   * Initial bearing of the map.
   */
  initialBearing?: number;

  /**
   * CSS styles to be applied to the map
   */
  style?: React.CSSProperties;

  /**
   * Render map at 100% width and 100% height
   */
  fill?: boolean;

  /**
   * Whether to show the navigation control
   */
  navigationControl?: boolean;

  /**
   * Whether to show the geolocate control
   */
  geolocateControl?: boolean;

  /**
   * Whether to show the scale control
   */
  scaleControl?: boolean;

  /**
   * Whether to show the attribution control
   */
  attributionControl?: boolean;

  /**
   * Callback fired when a feature is clicked on the map.
   */
  onFeatureClick?: (event: unknown) => void;

  /**
   * React nodes to be rendered inside the map.
   */
  additionalControls?: React.ReactNode;

  /**
   * React nodes to be rendered inside the map.
   */
  children?: React.ReactNode;
}

/**
 * Map component that wraps the MapLibre GL JS library.
 * It provides a simple interface for rendering a map with various controls and layers.
 * It also allows for customization of the map's initial state and appearance.
 */
export function Map({
  baseLayer = Osm,
  initialCenter = DEFAULT_CENTER,
  initialZoom = DEFAULT_ZOOM,
  initialPitch = DEFAULT_PITCH,
  initialBearing = DEFAULT_BEARING,
  style = {},
  fill = true,
  navigationControl = true,
  geolocateControl = true,
  scaleControl = true,
  attributionControl = true,
  additionalControls,
  children,
  ...rest
}: MapProps & React.ComponentProps<typeof RMap>) {
  return (
    <BlueprintProvider>
      <RMap
        mapStyle={baseLayer.style}
        initialCenter={initialCenter}
        initialZoom={initialZoom}
        initialPitch={initialPitch}
        initialBearing={initialBearing}
        style={fill ? { width: "100%", height: "100%", ...style } : style}
        scrollZoom={true}
        dragPan={true}
        dragRotate={true}
        touchZoomRotate={true}
        doubleClickZoom={true}
        initialPitchWithRotate={true}
        initialAttributionControl={false}
        {...rest}
      >
        {additionalControls}
        {navigationControl && (
          <RNavigationControl
            position="top-right"
            visualizePitch={true}
            showCompass={true}
            showZoom={true}
          />
        )}
        {geolocateControl && <RGeolocateControl position="top-right" />}
        {scaleControl && <RScaleControl position="bottom-left" />}
        {attributionControl && <RAttributionControl position="bottom-right" />}
        {children}
      </RMap>
    </BlueprintProvider>
  );
}
