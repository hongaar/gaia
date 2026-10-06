import type { SpecContent } from "../../plugins/spec";

export type DocsVersionRef = {
  version: string;
  label: string;
};

/** Maps the active Docusaurus docs version to a `packages/spec` directory name. */
export function resolveSpecVersion(
  docsVersion: DocsVersionRef,
  data: SpecContent,
): string {
  const { version, label } = docsVersion;

  if (data.versions.includes(label)) {
    return label;
  }
  if (version !== "current" && data.versions.includes(version)) {
    return version;
  }

  return data.latest;
}
