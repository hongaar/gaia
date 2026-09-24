---
title: Consuming a source
---

# Consuming a source

A client fetches a manifest URL, then fetches a resource `href` when it needs
features. `@gaia/example-client` is that client today.

```bash
yarn workspace @gaia/example-client start:dev
```

The app opens on port `3000`. Add a source URL in the UI (for the example
server, `http://localhost:3001`). `FeatureSourceProvider` stores the manifest
and the visible layers in `localStorage`, and `getFeatures` loads the resource
URL for a layer.

`@gaia/sdk-client-js` is the package reserved for a shared client library. It
does not yet expose a source API, so reading a source means `fetch` against the
manifest and resource URLs, as the example client does.
