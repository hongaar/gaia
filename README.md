<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [gaia](#gaia)
  - [Packages](#packages)
  - [Repository layout](#repository-layout)
  - [Getting started](#getting-started)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# gaia

Gaia is a small protocol for publishing geospatial data: a JSON manifest
describes a source, and resources point at GeoJSON feature collections. This
repository holds the specification, JavaScript libraries, map components,
runnable examples, and the documentation site.

Documentation: [packages/docs](packages/docs). The spec itself lives in
[packages/spec](packages/spec) and is rendered from there.

## Packages

| Package                                                         | Role                                                                             |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`@gaia/spec`](packages/spec)                                   | Versioned JSON Schemas and examples for manifests and feature collections.       |
| [`@gaia/sdk-client-js`](packages/sdk-client-js)                 | Reserved for a shared client library. No source API yet; use the example client. |
| [`@gaia/sdk-server-js`](packages/sdk-server-js)                 | Reserved for a shared server library. No source API yet; use the example server. |
| [`@gaia/components`](packages/components)                       | React map components (MapLibre, Storybook).                                      |
| [`@gaia/example-client`](packages/example-client)               | Example map app that loads Gaia sources.                                         |
| [`@gaia/example-server`](packages/example-server)               | Example NestJS source that serves a manifest and feature collections.            |
| [`@gaia/example-server-simple`](packages/example-server-simple) | Smaller variant of the example server.                                           |
| [`docs`](packages/docs)                                         | Docusaurus site.                                                                 |

## Repository layout

```text
packages/
  spec/                  JSON Schemas, one directory per version (v1, …)
  sdk-client-js/         Client SDK
  sdk-server-js/         Server SDK
  components/            Shared React map UI
  example-client/        Create React App example
  example-server/        NestJS example source
  example-server-simple/ Minimal NestJS example source
  docs/                  Documentation site
```

The root is a Yarn workspaces monorepo (`packages/*`). TypeScript project
references live in `tsconfig.json` and `tsconfig.base.json`.

## Getting started

Requirements: Node.js 20 or newer, and Yarn 4 (the repo pins `packageManager` in
the root `package.json`). From the repository root:

```bash
corepack enable
yarn install
```

Run every package that defines `start:dev` (TypeScript watch, docs, Storybook,
both examples):

```bash
yarn dev
```

The example client (Create React App) and the docs site both want port 3000. Run
one workspace when you need a single app:

```bash
yarn workspace @gaia/example-server start:dev   # http://localhost:3001
yarn workspace @gaia/example-client start:dev   # http://localhost:3000
yarn workspace docs start:dev                   # documentation site
yarn workspace @gaia/components start:dev       # Storybook on port 6006
```

Other root scripts:

```bash
yarn build          # topological build of every workspace
yarn test           # tests in every workspace
yarn format         # Prettier
yarn typescript     # clean and rebuild the TypeScript solution
```

Point the example client at the example server by adding the server origin as a
feature source. The server reads fixtures under
`packages/example-server/fixtures`, rewrites `{{BASE_URL}}` from the incoming
request, and listens on `PORT` (default `3001`).
