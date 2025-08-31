import { arr, arrStatus, IS_BLOCK, IS_TRANSLUCEN } from "../store";
import { produce } from "immer";
// --------------------- [ 计算每个格子的分数 ] ---------------------
export default function calcCellScore({ row, col, includeTranslucen = false }) {
  let len = arr.get().length;
  let validStatus = includeTranslucen ? [IS_BLOCK, IS_TRANSLUCEN] : [IS_BLOCK];
  // --------------------- [ 计算基本分 ] ---------------------
  function _calcBase() {
    let result = 1;
    // --------------------- [ 计算行 ] ---------------------
    for (let j = col - 1; j >= 0; --j) {
      if (validStatus.includes(arrStatus.get()[row][j])) {
        result++;
      } else {
        break;
      }
    }
    for (let j = col + 1; j < len; ++j) {
      if (validStatus.includes(arrStatus.get()[row][j])) {
        result++;
      } else {
        break;
      }
    }
    // --------------------- [ 计算列 ] ---------------------
    for (let i = row - 1; i >= 0; --i) {
      if (validStatus.includes(arrStatus.get()[i][col])) {
        result++;
      } else {
        break;
      }
    }
    for (let i = row + 1; i < len; ++i) {
      if (validStatus.includes(arrStatus.get()[i][col])) {
        result++;
      } else {
        break;
      }
    }
    return result;
  }
  // --------------------- [ 计算特殊分 ] ---------------------
  function _calcSpecial() {
    let result = 0;
    // --------------------- [ 铺满一行 +2 ] ---------------------
    for (let j = 1; j < len; ++j) {
      if (!validStatus.includes(arrStatus.get()[row][(col + j) % len])) {
        break;
      }
      if (j === len - 1) {
        result += 2;
      }
    }
    // --------------------- [ 铺满一列 +7] ---------------------
    for (let i = 1; i < len; ++i) {
      if (!validStatus.includes(arrStatus.get()[(row + i) % len][col])) {
        break;
      }
      if (i === len - 1) {
        result += 7;
      }
    }
    // --------------------- [ 铺满一个颜色 +10] ---------------------
    for (let i = 1; i < len; ++i) {
      if (
        !validStatus.includes(arrStatus.get()[(row + i) % len][(col + i) % len])
      ) {
        break;
      }
      if (i === len - 1) {
        result += 10;
      }
    }
    return result;
  }
  // --------------------- [ 计算总分 ] ---------------------
  arr.set(
    produce(arr.get(), (draft) => {
      draft[row][col] = _calcBase() + _calcSpecial();
    })
  );
  return arr.get()[row][col];
}
