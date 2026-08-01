import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";
import { produce } from "immer";

// --------------------- [ 常量 ] ---------------------
export const IS_TRANSLUCEN = -1; // 预览（半透明）
export const IS_BASE = 0; // 空
export const IS_BLOCK = 1; // 已锁定
export const BOARD_SIZE = 5;
export const MINUS_ARRAY = [-1, -1, -2, -2, -2, -3, -3];

// --------------------- [ 类型 ] ---------------------
/**
 * @typedef {Object} Snapshot
 * @property {number[][]} arr
 * @property {number[][]} arrStatus
 * @property {boolean[]} minusArrState
 * @property {number} currentScore
 * @property {number} totalScore
 */

// --------------------- [ 持久化设置 ] ---------------------
export const isCheatMode = persistentAtom("azul-isCheatMode", false, {
  decode: (s) => s === "true",
  encode: (b) => (b ? "true" : "false"),
});

// --------------------- [ 初始状态工厂 ] ---------------------
const createInitArr = () =>
  Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => 0)
  );

const createInitStatus = () =>
  Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => IS_BASE)
  );

const createInitMinus = () => new Array(MINUS_ARRAY.length).fill(false);

// --------------------- [ 共享状态 ] ---------------------
export const arr = atom(createInitArr());
export const arrStatus = atom(createInitStatus());
export const minusArrState = atom(createInitMinus());
export const currentScore = atom(0);
export const totalScore = atom(0);
// 撤销历史（会话内，不持久化）
export const history = atom(/** @type {Snapshot[]} */([]));

// --------------------- [ 工具：深拷贝 ] ---------------------
/** @param {number[][]} grid */
const clone2D = (grid) => grid.map((row) => [...row]);
/** @param {boolean[]} list */
const clone1D = (list) => [...list];

/** @returns {Snapshot} */
const snapshot = () => ({
  arr: clone2D(arr.get()),
  arrStatus: clone2D(arrStatus.get()),
  minusArrState: clone1D(minusArrState.get()),
  currentScore: currentScore.get(),
  totalScore: totalScore.get(),
});

/** @param {Snapshot} state */
const restore = (state) => {
  arr.set(clone2D(state.arr));
  arrStatus.set(clone2D(state.arrStatus));
  minusArrState.set(clone1D(state.minusArrState));
  currentScore.set(state.currentScore);
  totalScore.set(state.totalScore);
};

// --------------------- [ 状态动作 ] ---------------------
// 确认前调用：压入当前状态快照
export function commitHistory() {
  history.set([...history.get(), snapshot()]);
}

/**
 * 撤销最近 n 步确认。
 * 快照在每次「确定」前压入，故 history[i] = 第 i+1 次确定前的状态。
 * 撤销 n 步 = 恢复倒数第 n 个快照，并截断其后的历史。
 * @param {number} [n]
 */
export function undo(n = 1) {
  const h = history.get();
  if (h.length === 0) return;
  const steps = Math.min(n, h.length);
  const target = /** @type {Snapshot} */ (h[h.length - steps]);
  restore(target);
  history.set(h.slice(0, h.length - steps));
}

// 重置整局
export function resetGame() {
  arr.set(createInitArr());
  arrStatus.set(createInitStatus());
  minusArrState.set(createInitMinus());
  currentScore.set(0);
  totalScore.set(0);
  history.set([]);
}

/**
 * 更新某一格状态（不可变）
 * @param {number} row
 * @param {number} col
 * @param {number} status
 */
export function setCellStatus(row, col, status) {
  arrStatus.set(
    produce(arrStatus.get(), (draft) => {
      draft[row][col] = status;
    })
  );
}

/**
 * 更新某一格分数（不可变）
 * @param {number} row
 * @param {number} col
 * @param {number} score
 */
export function setCellScore(row, col, score) {
  arr.set(
    produce(arr.get(), (draft) => {
      draft[row][col] = score;
    })
  );
}

/**
 * 一次性写入整张分数表（不可变）
 * @param {(draft: number[][]) => void} updater
 */
export function setAllScores(updater) {
  arr.set(produce(arr.get(), updater));
}

/**
 * 切换某个减分位
 * @param {number} index
 * @param {boolean} checked
 */
export function toggleMinus(index, checked) {
  minusArrState.set(
    produce(minusArrState.get(), (draft) => {
      draft[index] = checked;
    })
  );
}

// 清空减分墙（进入下一回合）
export function clearMinus() {
  minusArrState.set(createInitMinus());
}
