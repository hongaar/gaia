---
sidebar_position: 2
title: Architecture
---

# Architecture

A Gaia deployment has three roles. They only share the JSON documents defined by
the spec.

```text
source (manifest + feature collections)
        │
        │  HTTPS JSON
        ▼
client app
        │
        ▼
map components
```

**Source.** `GET` on the source origin returns a manifest. Feature collections
live at the `href` of each resource (the example server uses `/features` and
`/features/:id`). Authentication, when present, is declared on the manifest.
Version 1 lists HTTP Basic (`auth[].method = "basic"`). Omitting `auth` means
the source is public.

**Client.** Anything that can fetch JSON can consume a source.
`@gaia/example-client` stores manifest URLs in the browser, fetches each
manifest, then fetches a resource URL when a layer is shown.
`@gaia/sdk-client-js` is the workspace reserved for a shared client. It has no
source API yet, so the example client is the implementation to follow.

**Map UI.** `@gaia/components` renders MapLibre maps, markers, base-layer
switching, and map state. It does not speak the Gaia protocol by itself. An
application, such as the example client, loads features and passes them to the
map.

The example server (`@gaia/example-server`) is a NestJS app with two modules:

- **Manifest** reads `fixtures/manifest.json` and replaces `{{BASE_URL}}` using
  the request protocol and host (`X-Forwarded-Proto` when a proxy sets it).
- **Features** lists and returns fixture feature collections under
  `fixtures/feature-collections`.

`@gaia/example-server-simple` is the same shape with less surface area, useful
as a starting point for a new source. `@gaia/sdk-server-js` is reserved for a
shared server library and has no source API yet.
