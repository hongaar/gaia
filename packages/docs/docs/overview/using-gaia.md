---
sidebar_position: 3
title: Using Gaia
---

# Using Gaia

## Publish a source

Put a manifest at a stable public URL. Put each resource at the URL written in
`resources[].href`. Both documents must match the schemas for the spec version
you publish.

A static host is enough. A service is appropriate when the collection depends on
the request, for example when a layer `parameter` changes which features are
returned. The manifest’s `href` is the canonical URL of that document, and each
feature’s `href` is the canonical URL of that feature.

Details are in [Publishing a source](./guides/publishing). Sample documents live
in `packages/spec/examples`.

## Read a source

Fetch the manifest URL. Read `resources` and the `layers` on each resource.
Fetch a resource `href` when you need its features. Draw the GeoJSON with
whatever map you use.

Details are in [Consuming a source](./guides/consuming).

Field rules are on the [specification](./spec) page.
