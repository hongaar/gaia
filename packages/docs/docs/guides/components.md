---
title: Map components
---

# Map components

`@gaia/components` is the React map library. It depends on MapLibre GL,
Blueprint, and Fela, and expects React 19 as a peer dependency. The example
client depends on it with `workspace:*`.

```bash
yarn workspace @gaia/components start:dev
```

That starts Storybook on port 6006, which is the place to try each component.

```tsx
import { Map, Marker } from "@gaia/components";
```

`Map` wraps a MapLibre map. Pass `initialCenter`, `initialZoom`, `initialPitch`,
and `initialBearing` for the opening view, `baseLayer` for the background style,
and `children` for markers and other overlays. `navigationControl`,
`geolocateControl`, `scaleControl`, and `attributionControl` default to on.
`fill` makes the map take the full width and height of its parent.

`Marker` takes a `location` and an optional `tooltip`. `BaseLayerControl`
switches the background style. `MapState`, with `LocalStorageProvider` or
`SearchProvider`, keeps the view state.

The library draws a map. Loading a Gaia manifest is the application’s job, as in
the example client. Props are listed in the
[components reference](../reference/components).
