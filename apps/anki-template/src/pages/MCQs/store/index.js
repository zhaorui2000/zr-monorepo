import { persistentAtom } from "@nanostores/persistent";
import marked from "@utils/marked";
export const OPTION_LABELS = ["A", "B", "C", "D"];
export const ANKI_QUESTION = marked.parse(String.raw`{{问题}}`, {
  async: false,
});
export const ANKI_TRUE_ANSWER = String.raw`{{答案}}`.toUpperCase();
export const ANKI_OPTIONS = [
  marked.parse(String.raw`{{A}}`, { async: false }),
  marked.parse(String.raw`{{B}}`, { async: false }),
  marked.parse(String.raw`{{C}}`, { async: false }),
  marked.parse(String.raw`{{D}}`, { async: false }),
];
export const answer = persistentAtom("answer", /** @type {string} */ (""));
export const isRandomOrder = persistentAtom("isRandomOrder", true, {
  encode: String,
  decode: (value) => value !== "false",
});
export const randomOrder = persistentAtom(
  "randomOrder",
  /** @type {number[]} */ ([1, 2, 3, 4]),
  {
    encode: (value) => value.join(","),
    decode: (value) => {
      const order = value.split(",").map(Number);
      return order.length === 4 && order.every((item) => item >= 1 && item <= 4)
        ? order
        : [1, 2, 3, 4];
    },
  },
);
export const duration = persistentAtom("duration", 0, {
  encode: (e) => `${e}`,
  decode: (s) => Number(s),
});
