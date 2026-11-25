/// <reference types="svelte" />
/// <reference types="vite/client" />

declare const katex: {
  renderToString(
    tex: string,
    options?: { throwOnError?: boolean; displayMode?: boolean },
  ): string;
};
