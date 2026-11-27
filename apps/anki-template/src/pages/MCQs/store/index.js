import { persistentAtom } from "@nanostores/persistent";
import marked from "@utils/marked";
import { parseMCQ } from "../utils/parseMCQ.js";
export const OPTION_LABELS = ["A", "B", "C", "D"];
const questionContent = String.raw`{{问题}}`.trim();
const parsedQuestion = parseMCQ(questionContent);
export const ANKI_QUESTION = marked.parse(
  parsedQuestion?.question ?? questionContent,
  {
    async: false,
  },
);
export const ANKI_TRUE_ANSWER = String.raw`{{答案}}`.toUpperCase();
export const MCQ_OPTIONS = parsedQuestion
  ? OPTION_LABELS.map((label) => parsedQuestion.options[label])
  : OPTION_LABELS;
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
