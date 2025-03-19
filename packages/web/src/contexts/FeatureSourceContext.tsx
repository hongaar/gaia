import type { FeatureCollection } from "geojson";
import { createContext, ReactNode, useContext, useState } from "react";

interface FeatureSource {
  $schema: string;
  href: string;
  name: string;
  description: string;
  icon: string;
  resources: Array<{
    href: string;
    type: string;
    layers: Array<{
      id: string;
      name: string;
      description: string;
      icon: string;
      options: string[];
      parameters: Array<{
        key: string;
        value: string;
      }>;
    }>;
  }>;
}

interface FeatureSourceContextType {
  sources: FeatureSource[];
  layerVisibility: Record<string, boolean>;
  addSource: (url: string) => Promise<void>;
  removeSource: (href: string) => void;
  toggleLayer: (
    sourceHref: string,
    resourceHref: string,
    layerId: string,
  ) => void;
  isLayerVisible: (
    sourceHref: string,
    resourceHref: string,
    layerId: string,
  ) => boolean;
  getFeatures: (
    sourceHref: string,
    resourceHref: string,
    layerId: string,
  ) => Promise<FeatureCollection | null>;
}

const FeatureSourceContext = createContext<
  FeatureSourceContextType | undefined
>(undefined);

export function FeatureSourceProvider({ children }: { children: ReactNode }) {
  const [sources, setSources] = useState<FeatureSource[]>([]);
  const [layerVisibility, setLayerVisibility] = useState<
    Record<string, boolean>
  >({});

  const fetchManifest = async (url: string): Promise<FeatureSource> => {
    try {
      const response = await fetch(`${url}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch manifest from ${url}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching manifest:", error);
      throw error;
    }
  };

  const addSource = async (url: string) => {
    if (url.trim()) {
      const manifest = await fetchManifest(url.trim());
      setSources((prev) => [...prev, manifest]);
    }
  };

  const removeSource = (href: string) => {
    setSources(sources.filter((source) => source.href !== href));
    // Clean up visibility state for removed source
    const newVisibility = { ...layerVisibility };
    Object.keys(newVisibility).forEach((key) => {
      if (key.startsWith(`${href}:`)) {
        delete newVisibility[key];
      }
    });
    setLayerVisibility(newVisibility);
  };

  const toggleLayer = (
    sourceHref: string,
    resourceHref: string,
    layerId: string,
  ) => {
    const key = `${sourceHref}:${resourceHref}:${layerId}`;
    setLayerVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isLayerVisible = (
    sourceHref: string,
    resourceHref: string,
    layerId: string,
  ): boolean => {
    const key = `${sourceHref}:${resourceHref}:${layerId}`;
    return !!layerVisibility[key];
  };

  const getFeatures = async (
    sourceHref: string,
    resourceHref: string,
    layerId: string,
  ): Promise<FeatureCollection | null> => {
    const source = sources.find((s) => s.href === sourceHref);
    if (!source) return null;

    const resource = source.resources.find((r) => r.href === resourceHref);
    if (!resource) return null;

    try {
      const response = await fetch(`${resourceHref}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch features for layer ${layerId}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching features:", error);
      return null;
    }
  };

  return (
    <FeatureSourceContext.Provider
      value={{
        sources,
        layerVisibility,
        addSource,
        removeSource,
        toggleLayer,
        isLayerVisible,
        getFeatures,
      }}
    >
      {children}
    </FeatureSourceContext.Provider>
  );
}

export function useFeatureSource() {
  const context = useContext(FeatureSourceContext);
  if (context === undefined) {
    throw new Error(
      "useFeatureSource must be used within a FeatureSourceProvider",
    );
  }
  return context;
}
