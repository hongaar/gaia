import "maplibre-gl/dist/maplibre-gl.css";
import {
  RAttributionControl,
  RGeolocateControl,
  RMap,
  RNavigationControl,
  RScaleControl,
} from "maplibre-react-components";
import React from "react";
import { BaseLayerControl } from "../index.js";

export interface MapProps {
  /**
   * Render map at 100% width and height
   */
  fill?: boolean;

  /**
   * CSS styles to be applied to the map
   */
  style?: React.CSSProperties;

  /**
   * Whether to show the base layer control
   */
  baseLayerControl?: boolean;

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
  children?: React.ReactNode;
}

export function Map({
  fill = true,
  style = {},
  baseLayerControl = true,
  navigationControl = true,
  geolocateControl = true,
  scaleControl = true,
  attributionControl = true,
  onFeatureClick,
  children,
}: MapProps) {
  return (
    <RMap
      style={fill ? { width: "100%", height: "100%", ...style } : style}
      scrollZoom={true}
      dragPan={true}
      dragRotate={true}
      touchZoomRotate={true}
      doubleClickZoom={true}
      initialPitchWithRotate={true}
      initialAttributionControl={false}
    >
      {baseLayerControl && (
        <BaseLayerControl
          layerId={"osm"}
          // onChange={(id) => setMapState((prev) => ({ ...prev, layer: id }))}
        />
      )}
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
