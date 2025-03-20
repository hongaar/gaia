import type { Feature } from "geojson";
import { useEffect, useState } from "react";

interface FeatureTooltipProps {
  feature: Feature | null;
  x: number;
  y: number;
}

export function FeatureTooltip({ feature, x, y }: FeatureTooltipProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!feature);
  }, [feature]);

  if (!visible || !feature) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        backgroundColor: "white",
        padding: "8px",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        zIndex: 1000,
        maxWidth: "300px",
        fontSize: "14px",
      }}
    >
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
    </div>
  );
}
