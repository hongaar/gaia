import type { Feature, FeatureCollection } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useEffect, useState } from "react";
import type { ViewState, MapLayerMouseEvent } from "react-map-gl/maplibre";
import MapLibre, {
  AttributionControl,
  Layer,
  NavigationControl,
  ScaleControl,
  Source,
} from "react-map-gl/maplibre";
import type { MapMouseEvent } from "maplibre-gl";
import {
  BaseLayerControl,
  baseLayers,
  FeatureSourceControl,
  LayerControl,
} from "../";
import { useFeatureSource } from "../../contexts/FeatureSourceContext";
import { FeatureTooltip } from "./FeatureTooltip";

interface GeoJSONSource {
  type: "geojson";
  data: FeatureCollection;
}

interface MapState extends ViewState {
  layer: string;
}

// Add CSS for navigation control positioning
const navigationStyle = `
  .maplibregl-ctrl-top-right {
    top: 50px !important;
  }
`;

// Initial view state
const initialMapState: MapState = {
  longitude: 5.3878,
  latitude: 52.1561,
  zoom: 7,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
  layer: "osm-raster",
};

// Function to get view state from URL parameters
function getMapState(): MapState {
  const params = new URLSearchParams(window.location.search);

  return {
    ...initialMapState,
    longitude: Number(params.get("lng") ?? initialMapState.longitude),
    latitude: Number(params.get("lat") ?? initialMapState.latitude),
    zoom: Number(params.get("zoom") ?? initialMapState.zoom),
    bearing: Number(params.get("bearing") ?? initialMapState.bearing),
    pitch: Number(params.get("pitch") ?? initialMapState.pitch),
    layer: params.get("layer") ?? initialMapState.layer,
  };
}

// Function to update URL with current view state
function updateUrl(mapState: MapState): void {
  const params = new URLSearchParams(window.location.search);

  params.set("lng", mapState.longitude.toFixed(6));
  params.set("lat", mapState.latitude.toFixed(6));
  params.set("zoom", mapState.zoom.toFixed(2));
  params.set("bearing", mapState.bearing.toFixed(2));
  params.set("pitch", mapState.pitch.toFixed(2));
  params.set("layer", mapState.layer);

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

export function Map() {
  const [mapState, setMapState] = useState<MapState>(getMapState());
  const { sources, getFeatures, isLayerVisible } = useFeatureSource();
  const [featureLayers, setFeatureLayers] = useState<
    Record<string, GeoJSONSource>
  >({});
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Update map state when moving map
  const onMove = useCallback(({ viewState }: { viewState: ViewState }) => {
    setMapState((prev) => ({ ...prev, ...viewState }));
  }, []);

  // Update URL when finished moving map
  const onMoveEnd = useCallback(
    ({ viewState }: { viewState: ViewState }) => {
      const newMapState = { ...mapState, ...viewState };
      setMapState(newMapState);
      updateUrl(newMapState);
    },
    [mapState],
  );

  // Update URL when layer changes
  useEffect(() => {
    updateUrl(mapState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapState.layer]);

  // Load feature layers when sources or layer visibility changes
  useEffect(() => {
    const loadFeatures = async () => {
      const newFeatureLayers: Record<string, GeoJSONSource> = {};

      for (const source of sources) {
        for (const resource of source.resources) {
          for (const layer of resource.layers) {
            if (isLayerVisible(source.href, resource.href, layer.id)) {
              const features = await getFeatures(
                source.href,
                resource.href,
                layer.id,
              );
              if (features) {
                const sourceId = `${source.href}-${resource.href}-${layer.id}`;
                newFeatureLayers[sourceId] = {
                  type: "geojson",
                  data: features,
                };
              }
            }
          }
        }
      }

      setFeatureLayers(newFeatureLayers);
    };

    loadFeatures();
  }, [sources, getFeatures, isLayerVisible]);

  const currentLayer = baseLayers.find((layer) => layer.id === mapState.layer);

  const handleMapClick = useCallback(
    (event: MapLayerMouseEvent) => {
      console.log("MapLayerMouseEvent:", event);
      // Get all features at the click point, but only from our custom layers
      const layerIds = Object.keys(featureLayers).flatMap((sourceId) => [
        `${sourceId}-points`,
        `${sourceId}-lines`,
        `${sourceId}-polygons-fill`,
        `${sourceId}-polygons-outline`,
      ]);
      const features = event.target.queryRenderedFeatures(event.point, {
        layers: layerIds,
      });
      if (features && features.length > 0) {
        setSelectedFeature(features[0]);
        setTooltipPosition({ x: event.point.x, y: event.point.y });
      } else {
        setSelectedFeature(null);
      }
    },
    [featureLayers],
  );

  const handleMapMouseMove = useCallback(
    (event: MapLayerMouseEvent) => {
      const layerIds = Object.keys(featureLayers).flatMap((sourceId) => [
        `${sourceId}-points`,
        `${sourceId}-lines`,
        `${sourceId}-polygons-fill`,
        `${sourceId}-polygons-outline`,
      ]);
      const features = event.target.queryRenderedFeatures(event.point, {
        layers: layerIds,
      });
      // Change cursor to pointer if hovering over a feature, otherwise default
      event.target.getCanvas().style.cursor =
        features.length > 0 ? "pointer" : "";
    },
    [featureLayers],
  );

  return (
    <>
      <style>{navigationStyle}</style>

      <MapLibre
        {...mapState}
        onMove={onMove}
        onMoveEnd={onMoveEnd}
        onClick={handleMapClick}
        onMouseMove={handleMapMouseMove}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={currentLayer?.style}
        scrollZoom={true}
        dragPan={true}
        dragRotate={true}
        touchZoomRotate={true}
        doubleClickZoom={true}
        attributionControl={false}
        reuseMaps={true}
        pitchWithRotate={true}
      >
        <BaseLayerControl
          layerId={mapState.layer}
          onChange={(id) => setMapState((prev) => ({ ...prev, layer: id }))}
        />
        <NavigationControl
          position="top-right"
          visualizePitch={true}
          showCompass={true}
          showZoom={true}
        />
        <ScaleControl />
        <AttributionControl position="bottom-right" />
        <FeatureSourceControl />
        <LayerControl />

        {Object.entries(featureLayers).map(([sourceId, sourceData]) => (
          <Source
            key={sourceId}
            id={sourceId}
            type="geojson"
            data={sourceData.data}
          >
            {/* Point features */}
            <Layer
              id={`${sourceId}-points`}
              type="circle"
              filter={[
                "all",
                ["==", ["geometry-type"], "Point"],
                ["!=", ["get", "type"], "vertex"], // Exclude vertices
              ]}
              paint={{
                "circle-radius": 6,
                "circle-color": ["get", "color"],
                "circle-stroke-width": 1,
                "circle-stroke-color": "#fff",
              }}
            />

            {/* LineString features */}
            <Layer
              id={`${sourceId}-lines`}
              type="line"
              filter={["==", ["geometry-type"], "LineString"]}
              paint={{
                "line-width": 2,
                "line-color": ["get", "color"],
              }}
            />

            {/* Polygon features */}
            <Layer
              id={`${sourceId}-polygons-fill`}
              type="fill"
              filter={["==", ["geometry-type"], "Polygon"]}
              paint={{
                "fill-color": ["get", "color"],
              }}
            />
            <Layer
              id={`${sourceId}-polygons-outline`}
              type="line"
              filter={["==", ["geometry-type"], "Polygon"]}
              paint={{
                "line-width": 1,
                "line-color": ["get", "color"],
              }}
            />
          </Source>
        ))}
      </MapLibre>
      <FeatureTooltip
        feature={selectedFeature}
        x={tooltipPosition.x}
        y={tooltipPosition.y}
      />
    </>
  );
}
