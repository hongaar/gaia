import type { IconName } from "@blueprintjs/icons";

// Base layer configurations
interface MapSource {
  type: "raster";
  tiles: string[];
  tileSize: number;
  attribution: string;
  maxzoom: number;
}

interface MapLayer {
  id: string;
  type: "raster";
  source: string;
}

interface MapStyle {
  version: 8;
  sources: {
    [key: string]: MapSource;
  };
  layers: MapLayer[];
}

export interface BaseLayer {
  id: string;
  title: string;
  icon: IconName;
  style: MapStyle | string;
}

export const OsmRaster = {
  id: "osm-raster",
  title: "OpenStreetMap (raster)",
  icon: "map",
  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "&copy; OpenStreetMap Contributors",
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm",
      },
    ],
  },
} satisfies BaseLayer;

export const OsmVector = {
  id: "osm-vector",
  title: "OpenStreetMap (vector)",
  icon: "globe-network",
  style: "https://tiles.openfreemap.org/styles/liberty",
} satisfies BaseLayer;

export const builtinBaseLayers = [OsmRaster, OsmVector];
