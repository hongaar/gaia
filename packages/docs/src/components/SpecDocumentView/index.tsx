import { useDocsVersion } from "@docusaurus/plugin-content-docs/client";
import { usePluginData } from "@docusaurus/useGlobalData";
import type { ReactElement } from "react";
import type { SpecContent, SpecExample } from "../../../plugins/spec";
import { resolveSpecVersion } from "../../utils/resolveSpecVersion";

const REPO = "https://github.com/hongaar/gaia/blob/main";

function exampleMatchesDocument(
  example: SpecExample,
  documentId: string,
): boolean {
  const stem = example.filename.replace(/\.json$/, "");
  return stem === documentId;
}

type Props = {
  documentId: string;
};

export default function SpecDocumentView({ documentId }: Props): ReactElement {
  const data = usePluginData("gaia-spec") as SpecContent;
  const docsVersion = useDocsVersion();
  const knownVersion = resolveSpecVersion(docsVersion, data);
  const current = data.documents.find(
    (doc) => doc.version === knownVersion && doc.id === documentId,
  );
  const examples = data.examples.filter(
    (example) =>
      example.version === knownVersion &&
      exampleMatchesDocument(example, documentId),
  );

  if (!current) {
    return (
      <p>
        No schema named <code>{documentId}</code> was found for this spec
        version in <code>packages/spec</code>.
      </p>
    );
  }

  return (
    <div>
      <p>{current.description}</p>
      <p>
        Source:{" "}
        <a href={`${REPO}/${current.sourcePath}`}>{current.sourcePath}</a>
      </p>
      <pre>
        <code>{JSON.stringify(current.schema, null, 2)}</code>
      </pre>
      {examples.length > 0 && (
        <>
          <h2>Examples</h2>
          {examples.map((example) => (
            <div key={example.sourcePath}>
              <p>
                <a href={`${REPO}/${example.sourcePath}`}>
                  {example.sourcePath}
                </a>
              </p>
              <pre>
                <code>{JSON.stringify(example.body, null, 2)}</code>
              </pre>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
