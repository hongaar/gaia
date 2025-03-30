import React, { useEffect, useRef, useState } from "react";
import { baseLayers } from "./baseLayers.js";

export interface BaseLayerControlProps {
  layerId?: string;
  onChange?: (layerId: string) => void;
}

export function BaseLayerControl({ layerId, onChange }: BaseLayerControlProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const currentLayer = baseLayers.find((layer) => layer.id === layerId);

  return (
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
        onClick={() => setIsMenuOpen(true)}
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
                onChange?.(layer.id);
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
  );
}
