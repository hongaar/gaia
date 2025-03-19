// Base layer configurations
interface BaseLayer {
  id: string;
  name: string;
  thumbnail: string;
  style: any;
}

export const baseLayers: BaseLayer[] = [
  {
    id: "osm-raster",
    name: "OpenStreetMap (raster)",
    thumbnail: "/assets/icon-raster.png",
    style: {
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
    },
  },
  {
    id: "osm-vector",
    name: "OpenStreetMap (vector)",
    thumbnail: "/assets/icon-vector.png",
    style: "https://tiles.openfreemap.org/styles/liberty",
  },
];
