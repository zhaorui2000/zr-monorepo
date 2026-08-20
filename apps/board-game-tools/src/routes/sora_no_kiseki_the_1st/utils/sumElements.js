import { circuitMap } from "../store";
import { ELEMENTS } from "../store/elements";

// 计算指定结晶回路ID数组的元素属性总和
export default function sumElements(ids) {
  const totals = Object.fromEntries(ELEMENTS.map(({ key }) => [key, 0]));
  for (const id of ids) {
    const circuit = circuitMap.get(Number(id));
    if (!circuit) continue;
    for (const { key } of ELEMENTS) totals[key] += circuit[key] || 0;
  }
  return totals;
}
