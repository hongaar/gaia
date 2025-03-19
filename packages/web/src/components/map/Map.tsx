import "maplibre-gl/dist/maplibre-gl.css";
import MapLibre from "react-map-gl/maplibre";

const vector = "https://tiles.openfreemap.org/styles/liberty";
const raster =
  "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json";
const custom = {
  version: 8 as const,
  sources: {
    osm: {
      type: "raster" as const,
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster" as const,
      source: "osm",
    },
  ],
};

export function Map() {
  return (
    <MapLibre
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle={custom}
      reuseMaps
    />
  );
}
