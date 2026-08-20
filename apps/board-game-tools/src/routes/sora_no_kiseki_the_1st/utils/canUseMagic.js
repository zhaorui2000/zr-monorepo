import { ELEMENTS } from "../store/elements";

// 检查魔法元素需求是否被满足
export default function canUseMagic(requirement, totals) {
  return ELEMENTS.every(({ key }) => totals[key] >= (requirement[key] || 0));
}
