import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ViewState } from "react-map-gl/maplibre";
import MapLibre, {
  AttributionControl,
  NavigationControl,
} from "react-map-gl/maplibre";

// Add CSS for navigation control positioning
const navigationStyle = `
  .maplibregl-ctrl-top-right {
    top: 50px !important;
  }
`;

// Base layer configurations
interface BaseLayer {
  id: string;
  name: string;
  thumbnail: string;
  style: any;
}

const baseLayers: BaseLayer[] = [
  {
    id: "osm-raster",
    name: "OpenStreetMap Raster",
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
    name: "OpenStreetMap Vector",
    thumbnail: "/assets/icon-vector.png",
    style: "https://tiles.openfreemap.org/styles/liberty",
  },
];

// Initial view state
const initialViewState: ViewState = {
  longitude: 5.3878, // Centered on the Netherlands
  latitude: 52.1561, // Centered on the Netherlands
  zoom: 7,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

// Function to get view state from URL parameters
function getViewStateFromUrl(): Partial<ViewState> & { layer?: string } {
  const params = new URLSearchParams(window.location.search);
  return {
    longitude: params.has("lng") ? parseFloat(params.get("lng")!) : undefined,
    latitude: params.has("lat") ? parseFloat(params.get("lat")!) : undefined,
    zoom: params.has("zoom") ? parseFloat(params.get("zoom")!) : undefined,
    bearing: params.has("bearing")
      ? parseFloat(params.get("bearing")!)
      : undefined,
    layer: params.get("layer") || undefined,
  };
}

// Function to update URL with current view state
function updateUrl(viewState: ViewState, layer: string) {
  const params = new URLSearchParams(window.location.search);
  params.set("lng", viewState.longitude.toFixed(6));
  params.set("lat", viewState.latitude.toFixed(6));
  params.set("zoom", viewState.zoom.toFixed(2));
  params.set("bearing", viewState.bearing.toFixed(2));
  params.set("layer", layer);

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

export function Map() {
  const [viewState, setViewState] = useState<ViewState>(() => {
    const urlViewState = getViewStateFromUrl();
    return {
      ...initialViewState,
      longitude: urlViewState.longitude ?? initialViewState.longitude,
      latitude: urlViewState.latitude ?? initialViewState.latitude,
      zoom: urlViewState.zoom ?? initialViewState.zoom,
      bearing: urlViewState.bearing ?? initialViewState.bearing,
    };
  });
  const [selectedLayer, setSelectedLayer] = useState<string>(() => {
    const urlViewState = getViewStateFromUrl();
    return urlViewState.layer || "osm-raster";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback(({ viewState }: { viewState: ViewState }) => {
    setViewState(viewState);
  }, []);

  const onMoveEnd = useCallback(
    ({ viewState }: { viewState: ViewState }) => {
      updateUrl(viewState, selectedLayer);
    },
    [selectedLayer],
  );

  // Update URL when layer changes
  useEffect(() => {
    updateUrl(viewState, selectedLayer);
  }, [selectedLayer, viewState]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLayer = baseLayers.find((layer) => layer.id === selectedLayer);

  return (
    <>
      <style>{navigationStyle}</style>
      <div
        ref={menuRef}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          background: "white",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          overflow: "visible",
        }}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 12px",
            border: "none",
            background: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <img
            src={currentLayer?.thumbnail}
            alt={currentLayer?.name}
            style={{ width: "24px", height: "24px", objectFit: "cover" }}
          />
          <span>{currentLayer?.name}</span>
        </button>

        {isMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              background: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              borderRadius: "4px",
              marginTop: "4px",
              minWidth: "200px",
              zIndex: 1001,
            }}
          >
            {baseLayers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => {
                  setSelectedLayer(layer.id);
                  setIsMenuOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  borderBottom: "1px solid #eee",
                }}
              >
                <img
                  src={layer.thumbnail}
                  alt={layer.name}
                  style={{ width: "24px", height: "24px", objectFit: "cover" }}
                />
                <span>{layer.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <MapLibre
        {...viewState}
        onMove={onMove}
        onMoveEnd={onMoveEnd}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={currentLayer?.style}
        scrollZoom={true}
        dragPan={true}
        dragRotate={true}
        touchZoomRotate={true}
        doubleClickZoom={true}
        attributionControl={false}
        reuseMaps={true}
        pitchWithRotate={false}
      >
        <NavigationControl
          position="top-right"
          showCompass={true}
          showZoom={true}
        />
        <AttributionControl position="bottom-right" />
      </MapLibre>
    </>
  );
}
