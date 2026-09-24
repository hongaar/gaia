import type { LoadContext, Plugin } from "@docusaurus/types";
import fs from "fs";
import path from "path";

export type SpecDocument = {
  version: string;
  id: string;
  filename: string;
  title: string;
  description: string;
  sourcePath: string;
  schema: unknown;
};

export type SpecExample = {
  version: string;
  filename: string;
  sourcePath: string;
  body: unknown;
};

export type SpecContent = {
  versions: string[];
  latest: string;
  documents: SpecDocument[];
  examples: SpecExample[];
};

function specRoot(siteDir: string): string {
  return path.resolve(siteDir, "../spec");
}

function readJson(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown;
}

function versionNumber(name: string): number {
  const match = /^v(\d+)$/.exec(name);
  return match ? Number(match[1]) : -1;
}

function listVersions(root: string): string[] {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && versionNumber(entry.name) >= 0)
    .map((entry) => entry.name)
    .sort((a, b) => versionNumber(b) - versionNumber(a));
}

function loadSpec(root: string): SpecContent {
  const versions = listVersions(root);
  const documents: SpecDocument[] = [];
  const examples: SpecExample[] = [];

  for (const version of versions) {
    const schemaDir = path.join(root, version);
    for (const filename of fs.readdirSync(schemaDir).sort()) {
      if (!filename.endsWith(".schema.json")) continue;
      const schema = readJson(path.join(schemaDir, filename)) as {
        title?: string;
        description?: string;
      };
      const id = filename.replace(/\.schema\.json$/, "");
      documents.push({
        version,
        id,
        filename,
        title: schema.title ?? id,
        description: schema.description ?? "",
        sourcePath: `packages/spec/${version}/${filename}`,
        schema,
      });
    }

    const exampleDir = path.join(root, "examples", version);
    if (!fs.existsSync(exampleDir)) continue;
    for (const filename of fs.readdirSync(exampleDir).sort()) {
      if (!filename.endsWith(".json")) continue;
      examples.push({
        version,
        filename,
        sourcePath: `packages/spec/examples/${version}/${filename}`,
        body: readJson(path.join(exampleDir, filename)),
      });
    }
  }

  return {
    versions,
    latest: versions[0] ?? "",
    documents,
    examples,
  };
}

export default function specPlugin(context: LoadContext): Plugin<SpecContent> {
  return {
    name: "gaia-spec",
    async loadContent() {
      return loadSpec(specRoot(context.siteDir));
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
}
