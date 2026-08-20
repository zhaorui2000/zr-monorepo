/**
 * 七元素统一定义：key 对应回路/魔法数据字段，label 对应显示名与图标
 * @typedef {{ key: "earth" | "water" | "fire" | "wind" | "time" | "space" | "illusion", label: string }} Element
 */

/** @type {Element[]} */
export const ELEMENTS = [
  { key: "earth", label: "地" },
  { key: "water", label: "水" },
  { key: "fire", label: "火" },
  { key: "wind", label: "风" },
  { key: "time", label: "时" },
  { key: "space", label: "空" },
  { key: "illusion", label: "幻" },
];
