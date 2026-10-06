import type { ReactElement, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type SdkGroup = "client" | "server";

export type SdkLanguageId = "typescript";

type SdkLanguageDefinition = {
  id: SdkLanguageId;
  label: string;
};

const SDK_LANGUAGES: SdkLanguageDefinition[] = [
  { id: "typescript", label: "TypeScript" },
];

const STORAGE_KEY: Record<SdkGroup, string> = {
  client: "gaia-docs-sdk-language-client",
  server: "gaia-docs-sdk-language-server",
};

type SdkLanguageContextValue = {
  group: SdkGroup;
  language: SdkLanguageId;
  setLanguage: (language: SdkLanguageId) => void;
  languages: SdkLanguageDefinition[];
};

const SdkLanguageContext = createContext<SdkLanguageContextValue | null>(null);

function readStoredLanguage(group: SdkGroup): SdkLanguageId {
  if (typeof window === "undefined") {
    return "typescript";
  }
  const stored = window.localStorage.getItem(STORAGE_KEY[group]);
  if (stored === "typescript") {
    return stored;
  }
  return "typescript";
}

function writeStoredLanguage(group: SdkGroup, language: SdkLanguageId): void {
  window.localStorage.setItem(STORAGE_KEY[group], language);
}

function useSdkLanguageContext(): SdkLanguageContextValue {
  const context = useContext(SdkLanguageContext);
  if (!context) {
    throw new Error(
      "SdkLanguage components must be used inside SdkLanguageRoot",
    );
  }
  return context;
}

export function useSdkLanguage(): SdkLanguageId {
  return useSdkLanguageContext().language;
}

type SdkLanguageRootProps = {
  group: SdkGroup;
  children: ReactNode;
};

export function SdkLanguageRoot({
  group,
  children,
}: SdkLanguageRootProps): ReactElement {
  const [language, setLanguageState] = useState<SdkLanguageId>("typescript");

  useEffect(() => {
    setLanguageState(readStoredLanguage(group));
  }, [group]);

  const setLanguage = useCallback(
    (next: SdkLanguageId) => {
      setLanguageState(next);
      writeStoredLanguage(group, next);
    },
    [group],
  );

  const value = useMemo(
    () => ({
      group,
      language,
      setLanguage,
      languages: SDK_LANGUAGES,
    }),
    [group, language, setLanguage],
  );

  return (
    <SdkLanguageContext.Provider value={value}>
      <div className="margin-bottom--md">
        <label>
          Language{" "}
          <select
            aria-label="SDK language"
            className="sdk-language-select"
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value as SdkLanguageId)
            }
          >
            {SDK_LANGUAGES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {children}
    </SdkLanguageContext.Provider>
  );
}

type SdkLanguageContentProps = {
  language: SdkLanguageId;
  children: ReactNode;
};

export function SdkLanguageContent({
  language,
  children,
}: SdkLanguageContentProps): ReactNode {
  const active = useSdkLanguage();
  if (active !== language) {
    return null;
  }
  return children;
}

export function ClientSdkDoc({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <SdkLanguageRoot group="client">{children}</SdkLanguageRoot>;
}

export function ServerSdkDoc({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <SdkLanguageRoot group="server">{children}</SdkLanguageRoot>;
}
