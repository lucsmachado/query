/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN: string;
  readonly VITE_TODOS_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
