import { persistentAtom } from "@nanostores/persistent";
export const isCheatMode = persistentAtom("isCheatMode", false, {
  decode: (s) => s === "true",
  encode: (b) => (b ? "true" : "false"),
});
