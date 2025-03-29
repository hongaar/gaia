import { Box, Tooltip } from "@mui/material";
import type { Feature } from "geojson";
import { useEffect, useState } from "react";
import type { MapRef } from "react-map-gl/maplibre";

interface FeatureTooltipProps {
  feature: Feature | null;
  lngLat: { lng: number; lat: number } | null;
  mapRef: MapRef | null;
}

export function FeatureTooltip({
  feature,
  lngLat,
  mapRef,
}: FeatureTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setVisible(!!feature);
  }, [feature]);

  // Update screen position when map moves or lngLat changes
  useEffect(() => {
    if (lngLat && mapRef) {
      const updatePosition = () => {
        const point = mapRef.project([lngLat.lng, lngLat.lat]);
        setScreenPosition({ x: point.x, y: point.y });
      };

      // Update position immediately
      updatePosition();

      // Add move event listener
      mapRef.on("move", updatePosition);

      // Cleanup
      return () => {
        mapRef.off("move", updatePosition);
      };
    }
  }, [lngLat, mapRef]);

  if (!visible || !feature) {
    return null;
  }

  const tooltipContent = (
    <Box sx={{ p: 1 }}>
      <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
        {feature.properties?.name || "Feature"}
      </h3>
      <div style={{ display: "grid", gap: "4px" }}>
        {Object.entries(feature.properties || {}).map(([key, value]) => (
          <div
            key={key}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span style={{ fontWeight: "bold", marginRight: "8px" }}>
              {key}:
            </span>
            <span>{String(value)}</span>
          </div>
        ))}
      </div>
    </Box>
  );

  return (
    <Tooltip
      open={true}
      title={tooltipContent}
      placement="top"
      arrow
      PopperProps={{
        anchorEl: {
          getBoundingClientRect: () => ({
            top: screenPosition.y,
            left: screenPosition.x,
            width: 0,
            height: 0,
            x: screenPosition.x,
            y: screenPosition.y,
            bottom: screenPosition.y,
            right: screenPosition.x,
            toJSON: () => ({
              top: screenPosition.y,
              left: screenPosition.x,
              width: 0,
              height: 0,
              x: screenPosition.x,
              y: screenPosition.y,
              bottom: screenPosition.y,
              right: screenPosition.x,
            }),
          }),
        },
      }}
    >
      <div
        style={{
          position: "absolute",
          left: screenPosition.x,
          top: screenPosition.y,
          width: 0,
          height: 0,
        }}
      />
    </Tooltip>
  );
}
