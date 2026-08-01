import { arrStatus, IS_BLOCK, IS_TRANSLUCEN, BOARD_SIZE } from "../store";

/**
 * 计算某格的分数（纯函数，不副作用写 arr）。
 * 计分公式与原逻辑一致：
 *   - 基础分 = 1（自身）+ 正交方向连续已填格数（遇空断开）
 *   - 铺满一行 +2、铺满一列 +7、铺满同色（主对角）+10
 * @param {{ row: number, col: number, includeTranslucen?: boolean }} opts
 * @returns {number}
 */
export default function calcCellScore({ row, col, includeTranslucen = false }) {
  const len = BOARD_SIZE;
  const status = arrStatus.get();
  const validStatus = includeTranslucen ? [IS_BLOCK, IS_TRANSLUCEN] : [IS_BLOCK];
  /** @param {number} r @param {number} c */
  const isFilled = (r, c) => validStatus.includes(status[r][c]);

  // --------------------- [ 基础分 ] ---------------------
  function _calcBase() {
    let result = 1; // 自身
    // 行：向左 / 向右连续已填
    for (let j = col - 1; j >= 0; --j) {
      if (isFilled(row, j)) result++;
      else break;
    }
    for (let j = col + 1; j < len; ++j) {
      if (isFilled(row, j)) result++;
      else break;
    }
    // 列：向上 / 向下连续已填
    for (let i = row - 1; i >= 0; --i) {
      if (isFilled(i, col)) result++;
      else break;
    }
    for (let i = row + 1; i < len; ++i) {
      if (isFilled(i, col)) result++;
      else break;
    }
    return result;
  }

  // --------------------- [ 加成分 ] ---------------------
  function _calcSpecial() {
    let result = 0;
    // 铺满一行 +2（用模运算检查本行其余格是否全填）
    let rowFull = true;
    for (let j = 1; j < len; ++j) {
      if (!isFilled(row, (col + j) % len)) {
        rowFull = false;
        break;
      }
    }
    if (rowFull) result += 2;
    // 铺满一列 +7
    let colFull = true;
    for (let i = 1; i < len; ++i) {
      if (!isFilled((row + i) % len, col)) {
        colFull = false;
        break;
      }
    }
    if (colFull) result += 7;
    // 铺满同色（主对角）+10
    let diagFull = true;
    for (let i = 1; i < len; ++i) {
      if (!isFilled((row + i) % len, (col + i) % len)) {
        diagFull = false;
        break;
      }
    }
    if (diagFull) result += 10;
    return result;
  }

  return _calcBase() + _calcSpecial();
}
