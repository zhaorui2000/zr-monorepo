import { persistentAtom } from "@nanostores/persistent";
export const OPTION_LABELS = ["A", "B", "C", "D"];
export const ANKI_QUESTION = "{{问题}}";
export const ANKI_TRUE_ANSWER = "{{答案}}";
export const ANKI_OPTIONS = ["{{A}}", "{{B}}", "{{C}}", "{{D}}"];
export const answer = persistentAtom("answer","")
export const randomOrder = persistentAtom("randomOrder",[1,2,3,4],{
    encode: (e) => e.join(','),
    decode: (s) => s.split(',').map(Number)
})
