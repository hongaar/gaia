import type { MapState } from "./MapState.js";
import { MapStateProvider } from "./MapStateProvider.js";

export class SearchProvider extends MapStateProvider {
  override set mapState(state) {
    const { center, zoom, bearing, pitch } = state;
    const url = new URL(window.location.href);

    if (center) {
      url.searchParams.set("center", `${center.lng},${center.lat}`);
    }
    if (zoom) {
      url.searchParams.set("zoom", zoom.toString());
    }
    if (bearing) {
      url.searchParams.set("bearing", bearing.toString());
    }
    if (pitch) {
      url.searchParams.set("pitch", pitch.toString());
    }

    window.history.replaceState({}, "", url.toString());
  }

  override get mapState(): MapState {
    const url = new URL(window.location.href);

    // get center as Object: { lng, lat }
    const center = url.searchParams.has("center")
      ? url.searchParams
          .get("center")!
          .split(",")
          .reduce(
            (acc, c, i) => {
              if (i === 0) {
                acc.lng = parseFloat(c);
              } else {
                acc.lat = parseFloat(c);
              }
              return acc;
            },
            { lng: 0, lat: 0 },
          )
      : undefined;
    const zoom = url.searchParams.has("zoom")
      ? parseFloat(url.searchParams.get("zoom")!)
      : undefined;
    const bearing = url.searchParams.has("bearing")
      ? parseFloat(url.searchParams.get("bearing")!)
      : undefined;
    const pitch = url.searchParams.has("pitch")
      ? parseFloat(url.searchParams.get("pitch")!)
      : undefined;

    return {
      center,
      zoom,
      bearing,
      pitch,
    };
  }
}
