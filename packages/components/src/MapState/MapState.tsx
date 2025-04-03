import { useMap } from "maplibre-react-components";
import { useCallback, useEffect } from "react";
import type { Location } from "../Map/const.js";
import type { MapStateProvider } from "./MapStateProvider.js";
import { SearchProvider } from "./SearchProvider.js";

export interface MapState {
  /**
   * The current map center.
   */
  center?: Location;

  /**
   * The current map zoom level.
   */
  zoom?: number;

  /**
   * The current map bearing.
   */
  bearing?: number;

  /**
   * The current map pitch.
   */
  pitch?: number;
}

export interface MapStateProps {
  /**
   * Callback fired when the map state changes.
   */
  provider?: MapStateProvider;
}

/**
 * MapState component for managing map state
 */
export function MapState({ provider = new SearchProvider() }: MapStateProps) {
  const map = useMap();

  const updateMapState = useCallback(
    function updateMapState() {
      const center = map.getCenter();
      const zoom = map.getZoom();
      const bearing = map.getBearing();
      const pitch = map.getPitch();

      provider.mapState = {
        center,
        zoom,
        bearing,
        pitch,
      };
    },
    [map, provider],
  );

  useEffect(() => {
    const initialState = provider.mapState;

    if (initialState.center) {
      map.setCenter(initialState.center);
    }
    if (initialState.zoom) {
      map.setZoom(initialState.zoom);
    }
    if (initialState.bearing) {
      map.setBearing(initialState.bearing);
    }
    if (initialState.pitch) {
      map.setPitch(initialState.pitch);
    }

    map.on("moveend", updateMapState);

    return () => {
      map.off("moveend", updateMapState);
    };
  }, [map, provider, updateMapState]);

  return null;
}
