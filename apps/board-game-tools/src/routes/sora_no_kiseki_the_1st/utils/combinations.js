// 生成数组的所有 k 大小组合
export default function combinations(arr, k) {
  if (k <= 0) return [[]];
  if (k > arr.length) return [];
  if (k === arr.length) return [Array.from(arr)];
  return arr.flatMap((item, i) =>
    combinations(arr.slice(i + 1), k - 1).map((rest) => [item, ...rest]),
  );
}
