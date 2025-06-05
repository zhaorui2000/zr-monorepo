import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";
export const scoreArr = persistentAtom("scoreArr", [], {
  encode: (e) => e.join(","),
  decode: (s) => s.split(",").map(Number),
});
export const scoreList = atom({
  animal: [
    {
      name: "牛",
      max: 6,
      compScore: (value) => {
        if (value === 0) return -1;
        return Math.floor((value + 2) / 2);
      },
    },
    {
      name: "猪",
      max: 7,
      compScore: (value) => {
        if (value === 0) return -1;
        return Math.floor((value + 1) / 2);
      },
    },
    {
      name: "羊",
      max: 8,
      compScore: (value) => {
        if (value === 0) return -1;
        if (value === 1) return 1;
        return Math.floor(value / 2);
      },
    },
  ],
  board: [
    {
      name: "农田",
      max: 5,
      compScore: (value) => {
        if (value <= 1) return -1;
        return value - 1;
      },
    },
    {
      name: "牧场",
      max: 4,
      compScore: (value) => {
        if (value === 0) return -1;
        return value;
      },
    },
  ],
  grain: [
    {
      name: "谷物",
      max: 8,
      compScore: (value) => {
        if (value === 0) return -1;
        if (value === 1) return 1;
        return Math.floor(value / 2);
      },
    },
    {
      name: "蔬菜",
      max: 4,
      compScore: (value) => {
        if (value === 0) return -1;
        return value;
      },
    },
  ],
  keyDev: [
    {
      name: "木工坊",
      max: 7,
      compScore: (value) => {
        if (value < 3) return 0;
        return Math.floor((value - 1) / 2);
      },
    },

    {
      name: "制篮工坊",
      max: 5,
      compScore: (value) => {
        if (value < 2) return 0;
        if (value < 4) return 1;
        if (value < 5) return 2;
        return 3;
      },
    },
    {
      name: "陶艺工坊",
      max: 7,
      compScore: (value) => {
        if (value < 3) return 0;
        return Math.floor((value - 1) / 2);
      },
    },
  ],
  other: [
    {
      name: "未使用格",
      max: 9,
      compScore: (value) => {
        return -value;
      },
    },
    {
      name: "畜棚",
      max: 9,
      compScore: (value) => {
        return value;
      },
    },
    {
      name: "砖屋",
      max: 9,
      compScore: (value) => {
        return value;
      },
    },
    {
      name: "石屋",
      max: 9,
      compScore: (value) => {
        return value * 2;
      },
    },
    {
      name: "人口",
      max: 9,
      compScore: (value) => {
        return value * 3;
      },
    },
    {
      name: "乞讨标志",
      max: 9,
      compScore: (value) => {
        return value * -3;
      },
    },
  ],
});
