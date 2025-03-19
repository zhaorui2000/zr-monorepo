import { persistentAtom } from "@nanostores/persistent";
export const answer = persistentAtom("answer","")
export const randomOrder = persistentAtom("randomOrder",[1,2,3,4],{
    encode: (e) => e.join(','),
    decode: (s) => s.split(',').map(Number)
})