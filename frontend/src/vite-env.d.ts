/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REOWN_PROJECT_ID: string
  readonly VITE_PIGGYBANK_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// REOWN AppKit Custom Elements
declare namespace JSX {
  interface IntrinsicElements {
    'appkit-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  }
}
