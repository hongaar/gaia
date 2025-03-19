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

interface BaseLayer {
  id: string;
  name: string;
  thumbnail: string;
  style: MapStyle | string;
}

export const baseLayers: BaseLayer[] = [
  {
    id: "osm-raster",
    name: "OpenStreetMap (raster)",
    thumbnail: "/assets/icon-raster.png",
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
  },
  {
    id: "osm-vector",
    name: "OpenStreetMap (vector)",
    thumbnail: "/assets/icon-vector.png",
    style: "https://tiles.openfreemap.org/styles/liberty",
  },
];
