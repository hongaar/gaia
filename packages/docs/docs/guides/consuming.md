---
title: Consuming a source
---

# Consuming a source

A client needs the manifest URL and the ability to fetch JSON. It does not need
a shared database or a generated client.

1. `GET` the manifest URL.
2. Validate it against the manifest schema for the version you support.
3. Show `name`, `description`, and `layers` to the person using the map.
4. If `auth` is set, obtain credentials for one of the declared methods before
   requesting a protected resource.
5. `GET` the resource `href` for the layer you want to show.
6. Validate the body as a feature collection and draw `features`.

Use each document’s `href` as its identity. Store that URL when you remember a
source or a feature, rather than a local id.

Layer `parameters` are part of the request the source described. Apply a
`key`/`value` parameter as the source documents it, and treat `filter` as a
predicate the source defined. Layer `options` affect presentation only.

Reload a collection when the parameters you send change. The manifest can stay
cached for as long as its URL still returns the catalog you expect. When `href`
on the manifest changes, treat it as a different source.
