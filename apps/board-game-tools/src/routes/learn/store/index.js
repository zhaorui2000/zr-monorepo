import { persistentAtom } from "@nanostores/persistent";

export const isLearning = persistentAtom("learn_isLearning", "false", {
    decode: str => str == "true",
    encode: Boolean
})

export const isWakeLock = persistentAtom("learn_isWakeLock", "false", {
    decode: str => str == "true",
    encode: Boolean
})

export const value = persistentAtom("learn_value", 0, {
    decode: Number,
    encode: e => `${e}`
})

export const operateTime = persistentAtom("learn_operateTime", 0, {
    decode: Number,
    encode: e => `${e}`
})

