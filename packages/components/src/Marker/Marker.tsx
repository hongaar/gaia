import { Popover } from "@blueprintjs/core";
import type { IStyle } from "fela";
import type { Marker as MarkerType, Popup as PopupType } from "maplibre-gl";
import { markerPopupOffset, RMarker, RPopup } from "maplibre-react-components";
import React, { useRef, useState } from "react";
import { useFela } from "react-fela";
import type { Location } from "../Map/const.js";
import { useMouseHover } from "../useMouseHover/useMouseHover.js";

export interface MarkerProps {
  /**
   * The location of the marker.
   */
  location: Location;

  /**
   * Tooltip
   */
  tooltip?: React.ComponentProps<typeof Popover>["content"];

  /**
   * Show tooltip on hover
   */
  showTooltipOnHover?: boolean;
}

const rule = () =>
  ({
    cursor: "pointer",
  }) satisfies IStyle;

/**
 * MapState component for managing map state
 */
export function Marker({ location, tooltip, showTooltipOnHover }: MarkerProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const markerRef = useRef<MarkerType>(null);
  const tooltipRef = useRef<PopupType>(null);
  const { css } = useFela();

  const isMouseOverMarker = useMouseHover({
    ref: markerRef,
    onMouseEnter: () => setIsTooltipOpen(true),
    onMouseLeave: () => {
      if (!isMouseOverTooltip) {
        setIsTooltipOpen(false);
      }
    },
  });
  const isMouseOverTooltip = useMouseHover({
    ref: tooltipRef,
    onMouseLeave: () => {
      if (!isMouseOverMarker) {
        setIsTooltipOpen(false);
      }
    },
  });

  if (tooltip) {
    return (
      <>
        {isTooltipOpen && (
          <RPopup
            ref={tooltipRef}
            offset={markerPopupOffset}
            longitude={location.lng}
            latitude={location.lat}
          >
            {tooltip}
          </RPopup>
        )}
        <RMarker
          ref={markerRef}
          longitude={location.lng}
          latitude={location.lat}
          className={css(rule)}
          onClick={() => {
            setIsTooltipOpen((s) => !s);
          }}
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
