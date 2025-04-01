export interface MapStateProps {
  /**
   * Callback fired when the map state changes.
   */
  foo?: string;
}

/**
 * MapState component for managing map state
 */
export function MapState({ foo }: MapStateProps) {
  return "test" + foo;
}
