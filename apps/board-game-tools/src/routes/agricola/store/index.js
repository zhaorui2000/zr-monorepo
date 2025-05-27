import { persistentAtom } from "@nanostores/persistent";
export const scoreArr = persistentAtom("scoreArr", [], {
  encode: (e) => e.join(","),
  decode: (s) => s.split(",").map(Number),
});
