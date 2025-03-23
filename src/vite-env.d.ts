/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_WEATHER_KEY: string
  readonly VITE_SERVICE_ID: string
  readonly VITE_TEMPLATE_ID: string
  readonly VITE_PUBLIC_ID: string
  readonly VITE_SITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
