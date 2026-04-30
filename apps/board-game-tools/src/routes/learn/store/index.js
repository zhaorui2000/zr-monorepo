import { persistentAtom } from "@nanostores/persistent";
import dayjs from "dayjs";

export const isLearning = persistentAtom("learn_isLearning", "false", {
    decode: (str) => str === "true",
    encode: String,
});

export const isWakeLock = persistentAtom("learn_isWakeLock", "false", {
    decode: (str) => str === "true",
    encode: String,
});

export const totalTime = persistentAtom("learn_totalTime", 0, {
    decode: Number,
    encode: String,
});

export const lastRecordDate = persistentAtom(
    "learn_lastRecordDate",
    dayjs().format("YYYY-MM-DD"),
);

export const value = persistentAtom("learn_value", 0, {
    decode: Number,
    encode: String,
});

export const operateTime = persistentAtom("learn_operateTime", dayjs().valueOf(), {
    decode: Number,
    encode: String,
});
