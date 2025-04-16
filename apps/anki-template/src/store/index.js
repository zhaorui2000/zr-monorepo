import { persistentAtom } from "@nanostores/persistent";
export const baseFontSize = persistentAtom("baseFontSize", 16, {
  encode: (e) => e.toString(),
  decode: Number,
});
