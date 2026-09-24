import {
  BaseLayerControl,
  Map as GaiaMap,
  MapState,
  Osm,
  SearchProvider,
} from "@gaia/components";
import type { Feature, FeatureCollection } from "geojson";
import type {
  GeoJSONSource,
  MapLayerMouseEvent,
  Map as MapLibreMap,
} from "maplibre-gl";
import { useMap } from "maplibre-react-components";
import { useEffect, useMemo, useState } from "react";
import { useFeatureSource } from "../../contexts/FeatureSourceContext";
import { FeatureSourceControl, LayerControl } from "../featureSource";
import { FeatureTooltip } from "./FeatureTooltip";

const searchProvider = new SearchProvider();

export function Map() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <GaiaMap
        baseLayer={Osm}
        initialCenter={{ lng: 5.3878, lat: 52.1561 }}
        initialZoom={7}
      >
        <MapState provider={searchProvider} />
        <BaseLayerControl initialBaseLayer={Osm} />
        <FeatureLayers />
      </GaiaMap>
      <FeatureSourceControl />
      <LayerControl />
    </div>
  );
}

function layerIdsFor(sourceId: string) {
  return [
    `${sourceId}-points`,
    `${sourceId}-lines`,
    `${sourceId}-polygons-fill`,
    `${sourceId}-polygons-outline`,
  ];
}

function FeatureLayers() {
  const map = useMap();
  const { sources, getFeatures, isLayerVisible } = useFeatureSource();
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    lng: number;
    lat: number;
  } | null>(null);

  const visibilityKey = useMemo(
    () =>
      sources
        .flatMap((source) =>
          source.resources.flatMap((resource) =>
            resource.layers.map(
              (layer) =>
                `${source.href}|${resource.href}|${layer.id}|${isLayerVisible(source.href, resource.href, layer.id)}`,
            ),
          ),
        )
        .join(","),
    [sources, isLayerVisible],
  );

  useEffect(() => {
    let cancelled = false;
    const sourceIds: string[] = [];

    async function load() {
      for (const source of sources) {
        for (const resource of source.resources) {
          for (const layer of resource.layers) {
            if (!isLayerVisible(source.href, resource.href, layer.id)) {
              continue;
            }
            const features = await getFeatures(
              source.href,
              resource.href,
              layer.id,
            );
            if (cancelled || !features) {
              continue;
            }
            const sourceId = `${source.href}-${resource.href}-${layer.id}`;
            sourceIds.push(sourceId);
            upsertGeoJson(map, sourceId, features);
          }
        }
      }
    }

    function sync() {
      if (!map.isStyleLoaded()) {
        return;
      }
      void load();
    }

    sync();
    map.on("style.load", sync);

    return () => {
      cancelled = true;
      map.off("style.load", sync);
      if (!map.isStyleLoaded()) {
        return;
      }
      for (const sourceId of sourceIds) {
        removeGeoJson(map, sourceId);
      }
    };
  }, [map, sources, getFeatures, isLayerVisible, visibilityKey]);

  useEffect(() => {
    const onClick = (event: MapLayerMouseEvent) => {
      const layers = sourceIds(map);
      if (layers.length === 0) {
        setSelectedFeature(null);
        setTooltipPosition(null);
        return;
      }
      const features = map.queryRenderedFeatures(event.point, { layers });
      const feature = features[0];
      if (feature) {
        setSelectedFeature(feature);
        setTooltipPosition({ lng: event.lngLat.lng, lat: event.lngLat.lat });
      } else {
        setSelectedFeature(null);
        setTooltipPosition(null);
      }
    };

    const onMouseMove = (event: MapLayerMouseEvent) => {
      const layers = sourceIds(map);
      const features =
        layers.length === 0
          ? []
          : map.queryRenderedFeatures(event.point, { layers });
      map.getCanvas().style.cursor = features.length > 0 ? "pointer" : "";
    };

    map.on("click", onClick);
    map.on("mousemove", onMouseMove);
    return () => {
      map.off("click", onClick);
      map.off("mousemove", onMouseMove);
    };
  }, [map]);

  return <FeatureTooltip feature={selectedFeature} lngLat={tooltipPosition} />;
}

function sourceIds(map: MapLibreMap) {
  return (map.getStyle().layers ?? [])
    .map((layer) => layer.id)
    .filter(
      (id) =>
        id.endsWith("-points") ||
        id.endsWith("-lines") ||
        id.endsWith("-polygons-fill") ||
        id.endsWith("-polygons-outline"),
    );
}

function upsertGeoJson(
  map: MapLibreMap,
  sourceId: string,
  data: FeatureCollection,
) {
  const existing = map.getSource(sourceId) as GeoJSONSource | undefined;
  if (existing) {
    existing.setData(data);
    return;
  }

  map.addSource(sourceId, { type: "geojson", data });
  map.addLayer({
    id: `${sourceId}-points`,
    type: "circle",
    source: sourceId,
    filter: [
      "all",
      ["==", ["geometry-type"], "Point"],
      ["!=", ["get", "type"], "vertex"],
    ],
    paint: {
      "circle-radius": 6,
      "circle-color": ["get", "color"],
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });
  map.addLayer({
    id: `${sourceId}-lines`,
    type: "line",
    source: sourceId,
    filter: ["==", ["geometry-type"], "LineString"],
    paint: {
      "line-width": 2,
      "line-color": ["get", "color"],
    },
  });
  map.addLayer({
    id: `${sourceId}-polygons-fill`,
    type: "fill",
    source: sourceId,
    filter: ["==", ["geometry-type"], "Polygon"],
    paint: {
      "fill-color": ["get", "color"],
    },
  });
  map.addLayer({
    id: `${sourceId}-polygons-outline`,
    type: "line",
    source: sourceId,
    filter: ["==", ["geometry-type"], "Polygon"],
    paint: {
      "line-width": 1,
      "line-color": ["get", "color"],
    },
  });
}

function removeGeoJson(map: MapLibreMap, sourceId: string) {
  for (const id of layerIdsFor(sourceId)) {
    if (map.getLayer(id)) {
      map.removeLayer(id);
    }
  }
  if (map.getSource(sourceId)) {
    map.removeSource(sourceId);
  }
}
