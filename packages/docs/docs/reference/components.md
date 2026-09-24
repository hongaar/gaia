---
title: "@gaia/components"
---

# `@gaia/components`

Package path: `packages/components`. The entry re-exports the modules below.
Built files are `dist` (import) and `types` (TypeScript).

## `Map`

`Map` renders a MapLibre map inside a Blueprint provider.

| Prop                                                                          | Role                                        |
| ----------------------------------------------------------------------------- | ------------------------------------------- |
| `baseLayer`                                                                   | Background style. Default is OpenStreetMap. |
| `initialCenter`, `initialZoom`, `initialPitch`, `initialBearing`              | Opening camera.                             |
| `fill`                                                                        | Stretch to the parent. Default `true`.      |
| `style`                                                                       | Extra CSS on the map element.               |
| `navigationControl`, `geolocateControl`, `scaleControl`, `attributionControl` | Built-in controls. Default `true`.          |
| `additionalControls`, `children`                                              | Extra React nodes inside the map.           |
| `onFeatureClick`                                                              | Called when a feature is clicked.           |

`BaseLayer` and the default center and zoom constants are exported from the same
package.

## `Marker`

| Prop                 | Role                                       |
| -------------------- | ------------------------------------------ |
| `location`           | Position on the map.                       |
| `tooltip`            | Blueprint popover content.                 |
| `showTooltipOnHover` | Open the tooltip on hover. Default `true`. |

## `BaseLayerControl`

Control for switching the base layer. Base layer definitions are exported from
`baseLayers`.

## `MapState`

`MapState` and `MapStateProvider` hold the current view. `LocalStorageProvider`
persists it in the browser. `SearchProvider` keeps it in the query string.
