import "maplibre-gl/dist/maplibre-gl.css";
import React from "react";
import MapLibre, {
  AttributionControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl/maplibre";
import { BaseLayerControl } from "../index.js";

export interface MapProps {
  /**
   * Render map at 100% screen width and height
   */
  fullscreen?: boolean;

  /**
   * Whether to show the base layer control
   */
  baseLayerControl?: boolean;

  /**
   * Whether to show the navigation control
   */
  navigationControl?: boolean;

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
  fullscreen,
  baseLayerControl = true,
  navigationControl = true,
  scaleControl = true,
  attributionControl = true,
  onFeatureClick,
  children,
}: MapProps) {
  return (
    <MapLibre
      style={fullscreen ? { width: "100vw", height: "100vh" } : {}}
      scrollZoom={true}
      dragPan={true}
      dragRotate={true}
      touchZoomRotate={true}
      doubleClickZoom={true}
      attributionControl={false}
      reuseMaps={true}
      pitchWithRotate={true}
    >
      {baseLayerControl && (
        <BaseLayerControl
          layerId={"osm"}
          // onChange={(id) => setMapState((prev) => ({ ...prev, layer: id }))}
        />
      )}
      {navigationControl && (
        <NavigationControl
          position="top-right"
          visualizePitch={true}
          showCompass={true}
          showZoom={true}
        />
      )}
      {scaleControl && <ScaleControl />}
      {attributionControl && <AttributionControl position="bottom-right" />}
      {children}
    </MapLibre>
  );
}
