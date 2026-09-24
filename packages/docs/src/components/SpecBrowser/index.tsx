import { useHistory, useLocation } from "@docusaurus/router";
import { usePluginData } from "@docusaurus/useGlobalData";
import type { ReactElement } from "react";
import type { SpecContent, SpecDocument } from "../../../plugins/spec";

const REPO = "https://github.com/hongaar/gaia/blob/main";

function param(search: string, key: string): string | null {
  return new URLSearchParams(search).get(key);
}

export default function SpecBrowser(): ReactElement {
  const data = usePluginData("gaia-spec") as SpecContent;
  const location = useLocation();
  const history = useHistory();

  const version = param(location.search, "version") ?? data.latest;
  const knownVersion = data.versions.includes(version) ? version : data.latest;
  const docs = data.documents.filter((doc) => doc.version === knownVersion);
  const requested = param(location.search, "document");
  const current: SpecDocument | undefined =
    docs.find((doc) => doc.id === requested) ?? docs[0];
  const examples = data.examples.filter(
    (example) => example.version === knownVersion,
  );

  const navigate = (nextVersion: string, nextDocument: string) => {
    const search = new URLSearchParams();
    search.set("version", nextVersion);
    search.set("document", nextDocument);
    history.push({ pathname: location.pathname, search: search.toString() });
  };

  if (!current) {
    return <p>No schemas were found in packages/spec.</p>;
  }

  return (
    <div>
      <div className="margin-bottom--md">
        <label>
          Version{" "}
          <select
            aria-label="Spec version"
            value={knownVersion}
            onChange={(event) => {
              const nextVersion = event.target.value;
              const nextDocs = data.documents.filter(
                (doc) => doc.version === nextVersion,
              );
              const sameId = nextDocs.find((doc) => doc.id === current.id);
              navigate(nextVersion, (sameId ?? nextDocs[0]).id);
            }}
          >
            {data.versions.map((item) => (
              <option key={item} value={item}>
                {item}
                {item === data.latest ? " (latest)" : ""}
              </option>
            ))}
          </select>
        </label>{" "}
        <label>
          Document{" "}
          <select
            aria-label="Spec document"
            value={current.id}
            onChange={(event) => navigate(knownVersion, event.target.value)}
          >
            {docs.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </select>
        </label>
      </div>
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
