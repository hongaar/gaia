---
sidebar_position: 1
slug: /
title: Gaia
---

# Gaia

Gaia describes how a geospatial data source introduces itself and how a client
fetches its features.

A **source** publishes a manifest: a name, a description, optional
authentication, and a list of resources. Each resource has a URL and a type. In
the current specification the only resource type is `feature-collection`, a
GeoJSON `FeatureCollection` with a stable `href` on the collection and on each
feature.

A client requests the manifest, chooses a layer, and requests that layer’s
feature collection. The source can be static files or any HTTP service that
returns those documents. The client and the source share the JSON documents, not
a runtime or a framework.

The normative documents are the JSON Schemas in
[`packages/spec`](https://github.com/hongaar/gaia/tree/main/packages/spec). The
[specification](./spec) page reads those files at build time, and a version
control switches between `v1`, `v2`, and later directories as they are added.
