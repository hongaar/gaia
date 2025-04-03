import type { MapState } from "./MapState.js";
import { MapStateProvider } from "./MapStateProvider.js";

export class LocalStorageProvider extends MapStateProvider {
  override set mapState(state) {
    localStorage.setItem("mapState", JSON.stringify(state));
  }

  override get mapState(): MapState {
    const storedState = localStorage.getItem("mapState");

    if (storedState) {
      return JSON.parse(storedState);
    }

    return {};
  }
}
