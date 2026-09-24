---
sidebar_position: 3
title: Using Gaia
---

# Using Gaia

## Publish a source

Serve a manifest that matches the manifest schema, and serve each resource at
the URL in `resources[].href`.

```bash
yarn workspace @gaia/example-server start:dev
```

`GET /` on port `3001` returns the manifest. `GET /features/:id` returns a
collection. Details are in [Publishing a source](./guides/publishing). A static
host is enough when the files are already valid JSON.
`packages/spec/examples/v1` is a manifest and a feature collection in that
shape.

## Show a source on a map

```bash
yarn workspace @gaia/example-client start:dev
```

Add `http://localhost:3001` as a source while the example server is running. The
client fetches the manifest, lists layers, and fetches a resource URL when a
layer is visible. Details are in [Consuming a source](./guides/consuming).

Drawing uses `@gaia/components`. See [Map components](./guides/components) and
the [components reference](./reference/components).

Field rules for the JSON documents are on the [specification](./spec) page.
