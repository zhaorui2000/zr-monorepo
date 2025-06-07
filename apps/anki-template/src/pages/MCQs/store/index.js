import { persistentAtom } from "@nanostores/persistent";
import marked from "@utils/marked";
export const OPTION_LABELS = ["A", "B", "C", "D"];
export const ANKI_QUESTION = marked(String.raw`{{问题}}`);
export const ANKI_TRUE_ANSWER = String.raw`{{答案}}`.toUpperCase();
export const ANKI_OPTIONS = [
  marked(String.raw`{{A}}`),
  marked(String.raw`{{B}}`),
  marked(String.raw`{{C}}`),
  marked(String.raw`{{D}}`),
];
export const answer = persistentAtom("answer", "");
export const randomOrder = persistentAtom("randomOrder", [1, 2, 3, 4], {
  encode: (e) => e.join(","),
  decode: (s) => s.split(",").map(Number),
});
export const duration = persistentAtom("duration", 0, {
  encode: (e) => `${e}`,
  decode: (s) => Number(s),
});
