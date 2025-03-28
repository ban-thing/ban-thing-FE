/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    VITE_GOOGLE_MAP_API_KEY: string;
}

interface ImportMeta {
    env: ImportMetaEnv;
}
