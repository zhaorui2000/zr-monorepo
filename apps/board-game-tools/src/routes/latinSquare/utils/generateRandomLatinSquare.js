export default function generateRandomLatinSquare(n) {
  // Step 1: 生成初始拉丁方阵（循环移位法）
  const square = new Array(n);
  for (let i = 0; i < n; i++) {
    square[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      square[i][j] = ((i + j) % n) + 1;
    }
  }

  // Step 2: 随机打乱行（Fisher-Yates 洗牌算法）
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [square[i], square[j]] = [square[j], square[i]];
  }

  // Step 3: 随机打乱列（先生成列索引的随机排列）
  const colIndices = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colIndices[i], colIndices[j]] = [colIndices[j], colIndices[i]];
  }

  // Step 4: 根据随机列索引重新排列每一行
  const result = square.map((row) => {
    const newRow = new Array(n);
    for (let i = 0; i < n; i++) {
      newRow[i] = row[colIndices[i]];
    }
    return newRow;
  });

  return result;
}
