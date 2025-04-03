import type { MapState } from "./MapState.js";

export abstract class MapStateProvider {
  abstract set mapState(state: MapState);
  abstract get mapState(): MapState;
}
