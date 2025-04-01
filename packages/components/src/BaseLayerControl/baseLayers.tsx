import type { MaybeElement } from "@blueprintjs/core";
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
  icon: IconName | MaybeElement;
  style: MapStyle | string;
}

export const Osm = {
  id: "osm",
  title: "OpenStreetMap",
  icon: "layers",
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

export const OsmVectorLight = {
  id: "osm-vector-light",
  title: "OpenStreetMap (vector light)",
  icon: "globe-network",
  style: "https://tiles.openfreemap.org/styles/positron",
} satisfies BaseLayer;

export const OsmCountriesOnly = {
  id: "osm-countries-only",
  title: "OpenStreetMap (countries only)",
  icon: "globe-network",
  style: "https://demotiles.maplibre.org/style.json",
} satisfies BaseLayer;

export const OpenTopoMap = {
  id: "opentopomap",
  title: "OpenTopoMap",
  icon: "map",
  style: {
    version: 8,
    sources: {
      opentopomap: {
        type: "raster",
        tiles: ["https://tile.opentopomap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution:
          "&copy; OpenStreetMap Contributors, &copy; OpenTopoMap (CC-BY-SA)",
        maxzoom: 17,
      },
    },
    layers: [
      {
        id: "opentopomap",
        type: "raster",
        source: "opentopomap",
      },
    ],
  },
} satisfies BaseLayer;

export const UsgsTopo = {
  id: "usgs-topo",
  title: "USGS Topo",
  icon: "map",
  style: {
    version: 8,
    sources: {
      usgs: {
        type: "raster",
        tiles: [
          "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution:
          '&copy; <a href="https://www.usgs.gov/">USGS</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxzoom: 20,
      },
    },
    layers: [
      {
        id: "usgs",
        type: "raster",
        source: "usgs",
      },
    ],
  },
} satisfies BaseLayer;

export const UsgsImagery = {
  id: "usgs-imagery",
  title: "USGS Imagery",
  icon: "satellite",
  style: {
    version: 8,
    sources: {
      usgs: {
        type: "raster",
        tiles: [
          "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution:
          '&copy; <a href="https://www.usgs.gov/">USGS</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxzoom: 20,
      },
    },
    layers: [
      {
        id: "usgs-imagery",
        type: "raster",
        source: "usgs",
      },
    ],
  },
} satisfies BaseLayer;

export const EsriImagery = {
  id: "esri-imagery",
  title: "Esri Imagery",
  icon: "satellite",
  style: {
    version: 8,
    sources: {
      esri: {
        type: "raster",
        tiles: [
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution:
          '&copy; <a href="https://www.esri.com/">Esri</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxzoom: 20,
      },
    },
    layers: [
      {
        id: "esri",
        type: "raster",
        source: "esri",
      },
    ],
  },
} satisfies BaseLayer;

export const GoogleHybrid = {
  id: "google-hybrid",
  title: "Google Hybrid",
  icon: "satellite",
  style: {
    version: 8,
    sources: {
      google: {
        type: "raster",
        tiles: [
          "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
          "https://mt2.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
          "https://mt3.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        ],
        tileSize: 256,
        attribution: "&copy; Google, &copy; OpenStreetMap Contributors",
        maxzoom: 20,
      },
    },
    layers: [
      {
        id: "google-hybrid",
        type: "raster",
        source: "google",
      },
    ],
  },
} satisfies BaseLayer;

export const GoogleRoads = {
  id: "google-roads",
  title: "Google Roads",
  icon: "layers",
  style: {
    version: 8,
    sources: {
      google: {
        type: "raster",
        tiles: [
          "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
          "https://mt2.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
          "https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        ],
        tileSize: 256,
        attribution: "&copy; Google, &copy; OpenStreetMap Contributors",
        maxzoom: 20,
      },
    },
    layers: [
      {
        id: "google-roads",
        type: "raster",
        source: "google",
      },
    ],
  },
} satisfies BaseLayer;

export const GoogleTerrain = {
  id: "google-terrain",
  title: "Google Terrain",
  icon: "layers",
  style: {
    version: 8,
    sources: {
      google: {
        type: "raster",
        tiles: [
          "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
          "https://mt2.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
          "https://mt3.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
        ],
        tileSize: 256,
        attribution: "&copy; Google, &copy; OpenStreetMap Contributors",
        maxzoom: 20,
      },
    },
    layers: [
      {
        id: "google-terrain",
        type: "raster",
        source: "google",
      },
    ],
  },
} satisfies BaseLayer;

export const GoogleSatellites = {
  id: "google-satellites",
  title: "Google Satellites",
  icon: "satellite",
  style: {
    version: 8,
    sources: {
      google: {
        type: "raster",
        tiles: [
          "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
          "https://mt2.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
          "https://mt3.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        ],
        tileSize: 256,
        attribution: "&copy; Google, &copy; OpenStreetMap Contributors",
        maxzoom: 20,
      },
    },
    layers: [
      {
        id: "google-satellites",
        type: "raster",
        source: "google",
      },
    ],
  },
} satisfies BaseLayer;

export const allBaseLayers = [
  Osm,
  GoogleRoads,
  GoogleTerrain,
  OsmVector,
  OsmVectorLight,
  OsmCountriesOnly,
  OpenTopoMap,
  UsgsTopo,
  GoogleHybrid,
  GoogleSatellites,
  UsgsImagery,
  EsriImagery,
];

export const defaultBaseLayers = [Osm, GoogleHybrid];
