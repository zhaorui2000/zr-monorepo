import { circuitMap } from "../store";

// 计算指定结晶回路ID数组的元素属性总和
export default function sumElements(ids) {
  const totals = { earth: 0, water: 0, fire: 0, wind: 0, time: 0, space: 0, illusion: 0 };
  
  for (const id of ids) {
    const circuit = circuitMap.get(Number(id));
    if (circuit) {
      totals.earth += circuit.earth || 0;
      totals.water += circuit.water || 0;
      totals.fire += circuit.fire || 0;
      totals.wind += circuit.wind || 0;
      totals.time += circuit.time || 0;
      totals.space += circuit.space || 0;
      totals.illusion += circuit.illusion || 0;
    }
  }
  
  return totals;
}