import type { StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  RAttributionControl,
  RGeolocateControl,
  RMap,
  RNavigationControl,
  RScaleControl,
} from "maplibre-react-components";
import React from "react";
import { OsmRaster } from "../BaseLayerControl/baseLayers.js";

export interface MapProps {
  /**
   * Map style URL or JSON object.
   */
  mapStyle?: StyleSpecification | string;

  /**
   * CSS styles to be applied to the map
   */
  style?: React.CSSProperties;

  /**
   * Render map at 100vw and 100vh
   */
  fullscreen?: boolean;

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
  onFeatureClick?: (event: any) => void;

  /**
   * React nodes to be rendered inside the map.
   */
  additionalControls?: React.ReactNode;

  /**
   * React nodes to be rendered inside the map.
   */
  children?: React.ReactNode;
}

export function Map({
  mapStyle = OsmRaster.style,
  style = {},
  fullscreen = true,
  navigationControl = true,
  geolocateControl = true,
  scaleControl = true,
  attributionControl = true,
  additionalControls,
  children,
}: MapProps) {
  return (
    <RMap
      mapStyle={mapStyle}
      style={fullscreen ? { width: "100vw", height: "100vh", ...style } : style}
      scrollZoom={true}
      dragPan={true}
      dragRotate={true}
      touchZoomRotate={true}
      doubleClickZoom={true}
      initialPitchWithRotate={true}
      initialAttributionControl={false}
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
  );
}
