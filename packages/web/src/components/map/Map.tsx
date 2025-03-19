import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ViewState } from "react-map-gl/maplibre";
import MapLibre, {
  AttributionControl,
  NavigationControl,
} from "react-map-gl/maplibre";
import { baseLayers } from "./baseLayers";

type MapState = ViewState & { layer: string };

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
function updateUrl(mapState: MapState) {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Update map state when moving map
  const onMove = useCallback(
    ({ viewState }: { viewState: ViewState }) => {
      setMapState({ ...mapState, ...viewState });
    },
    [mapState],
  );

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
    updateUrl({ ...mapState, layer: mapState.layer });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapState.layer]);

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

  const currentLayer = baseLayers.find((layer) => layer.id === mapState.layer);

  return (
    <>
      <style>{navigationStyle}</style>
      <div
        ref={menuRef}
        style={{
          zIndex: 1000,
          position: "absolute",
          top: "10px",
          right: "10px",
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
            padding: "8px",
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
        </button>

        {isMenuOpen && (
          <div
            style={{
              zIndex: 1001,
              position: "absolute",
              top: 0,
              right: 0,
              background: "white",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {baseLayers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => {
                  setMapState({ ...mapState, layer: layer.id });
                  setIsMenuOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  borderBottom: "1px solid #eee",
                  whiteSpace: "nowrap",
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
        {...mapState}
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
        pitchWithRotate={true}
      >
        <NavigationControl
          position="top-right"
          visualizePitch={true}
          showCompass={true}
          showZoom={true}
        />
        <AttributionControl position="bottom-right" />
      </MapLibre>
    </>
  );
}
