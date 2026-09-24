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

| Package                                           | Role                                                                       |
| ------------------------------------------------- | -------------------------------------------------------------------------- |
| [`@gaia/spec`](packages/spec)                     | Versioned JSON Schemas and examples for manifests and feature collections. |
| [`@gaia/sdk-client-js`](packages/sdk-client-js)   | Workspace reserved for a shared client library.                            |
| [`@gaia/sdk-server-js`](packages/sdk-server-js)   | Workspace reserved for a shared server library.                            |
| [`@gaia/components`](packages/components)         | React map components (MapLibre, Storybook).                                |
| [`@gaia/example-client`](packages/example-client) | Example map app that loads Gaia sources.                                   |
| [`@gaia/example-server`](packages/example-server) | Example source that serves a manifest and feature collections.             |
| [`docs`](packages/docs)                           | Documentation site. The site root is the docs.                             |

## Repository layout

```text
packages/
  spec/             JSON Schemas, one directory per version (v1, …)
  sdk-client-js/    Client SDK workspace
  sdk-server-js/    Server SDK workspace
  components/       Shared React map UI
  example-client/   Example map app
  example-server/   Example HTTP source
  docs/             Documentation site
```

The root is an npm workspaces monorepo (`packages/*`). TypeScript project
references live in `tsconfig.json` and `tsconfig.base.json`.

## Getting started

Requirements: Node.js 20 or newer, and npm 10. From the repository root:

```bash
npm ci
```

Run every workspace script named `start:dev` (TypeScript watch, docs, Storybook,
and the examples):

```bash
npm run dev
```

The example client and the docs site both want port 3000. Run one workspace when
you need a single app:

```bash
npm run start:dev -w @gaia/example-server   # http://localhost:3001
npm run start:dev -w @gaia/example-client   # http://localhost:3000
npm run start:dev -w docs                   # documentation site
npm run start:dev -w @gaia/components       # Storybook on port 6006
```

Other root scripts:

```bash
npm run build          # build every workspace that defines build
npm test               # test every workspace that defines test
npm run format         # Prettier
npm run typescript     # clean and rebuild the TypeScript solution
```
