import { Popover } from "@blueprintjs/core";
import type { Marker as MarkerType } from "maplibre-gl";
import { markerPopupOffset, RMarker, RPopup } from "maplibre-react-components";
import React, { useEffect } from "react";
import type { Location } from "../Map/const.js";

export interface MarkerProps {
  /**
   * The location of the marker.
   */
  location: Location;

  /**
   * Tooltip
   */
  tooltip?: React.ComponentProps<typeof Popover>["content"];
}

/**
 * MapState component for managing map state
 */
export function Marker2({ location, tooltip }: MarkerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const markerRef = React.useRef<MarkerType>(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.getElement().addEventListener("mouseenter", (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      });
      markerRef.current.getElement().addEventListener("mouseleave", (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
      });
    }
  }, [markerRef]);

  if (tooltip) {
    return (
      <>
        <RPopup
          offset={markerPopupOffset}
          longitude={location.lng}
          latitude={location.lat}
        >
          {tooltip}
        </RPopup>
        <RMarker
          ref={markerRef}
          longitude={location.lng}
          latitude={location.lat}
        />
      </>
    );
  }

  return (
    <>
      <RMarker longitude={location.lng} latitude={location.lat} />
    </>
  );
}
