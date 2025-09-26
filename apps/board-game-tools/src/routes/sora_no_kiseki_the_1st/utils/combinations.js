import { circuitMap } from "../store";

// 生成数组的所有k大小组合
export default function combinations(arr, k) {

  if (k <= 0) return [];
  if (k > arr.length) return combinations(arr, arr.length);
  if (k === 1) return arr.map(item => [item]);
  if (k === arr.length) return [Array.from(arr)];
  
  const result = [];
  
  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    
    // 剪枝：剩余元素不足以填满组合
    const remaining = k - current.length;
    const available = arr.length - start;
    if (available < remaining) return;
    
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return result;
}
