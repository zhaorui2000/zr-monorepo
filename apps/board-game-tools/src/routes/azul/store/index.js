import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";
import { produce } from "immer";

export const isCheatMode = persistentAtom("azul-isCheatMode", false, {
  decode: (s) => s === "true",
  encode: (b) => (b ? "true" : "false"),
});

export const IS_TRANSLUCEN = -1;
export const IS_BASE = 0;
export const IS_BLOCK = 1;
export const MINUS_ARRAY = [-1, -1, -2, -2, -2, -3, -3];

const initArr = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
];
const initState = [
  [IS_BASE, IS_BASE, IS_BASE, IS_BASE, IS_BASE],
  [IS_BASE, IS_BASE, IS_BASE, IS_BASE, IS_BASE],
  [IS_BASE, IS_BASE, IS_BASE, IS_BASE, IS_BASE],
  [IS_BASE, IS_BASE, IS_BASE, IS_BASE, IS_BASE],
  [IS_BASE, IS_BASE, IS_BASE, IS_BASE, IS_BASE],
];

export const arr = atom(initArr);
export const arrStatus = atom(initState);
export const minusArrState = atom(new Array(MINUS_ARRAY.length).fill(false));

export const currentScore = atom(0);
export const totalScore = atom(0);
