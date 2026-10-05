---
sidebar_position: 2
title: Architecture
---

# Architecture

A Gaia deployment has two parties. They only share the JSON documents defined by
the spec.

```text
source
  manifest
  feature collections
        │
        │  HTTPS JSON
        ▼
client
  read the manifest
  fetch a collection
  draw the features
```

**Source.** A stable URL returns the manifest. Each resource’s `href` returns
that resource. Authentication, when required, is declared on the manifest so a
client knows which method to use before it asks for data. Version 1 lists HTTP
Basic (`auth[].method = "basic"`). Omitting `auth` means the source is public.

**Client.** The client treats the manifest as a catalog and the resource URLs as
the data. It does not assume a path layout, a query language, or a particular
server. Layer `options` and `parameters` are hints carried in the manifest: how
a layer prefers to be drawn, and which key, value, or filter applies when the
collection is requested.

**Drawing.** Fetching JSON and drawing a map are separate. A map shows the
features the client already loaded. The protocol stops at the GeoJSON.
