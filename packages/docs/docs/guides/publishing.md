---
title: Publishing a source
---

# Publishing a source

A source is an HTTP origin that returns a manifest at its root and a feature
collection at each resource URL. `@gaia/example-server` is that server today.

```bash
yarn workspace @gaia/example-server start:dev
```

It listens on port `3001` unless `PORT` is set.

| Request             | Response                                                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /`             | Manifest. `{{BASE_URL}}` in the fixture is replaced with the request protocol and host. `X-Forwarded-Proto` is used when a proxy sets it. |
| `GET /features`     | Ids of the fixture collections.                                                                                                           |
| `GET /features/:id` | One feature collection.                                                                                                                   |

Fixtures live in `packages/example-server/fixtures`.
`@gaia/example-server-simple` is a smaller copy of the same server.

`@gaia/sdk-server-js` is the package reserved for a shared server library. It
does not yet expose a source API, so a new source should follow the example
server and the schemas in `packages/spec`.
