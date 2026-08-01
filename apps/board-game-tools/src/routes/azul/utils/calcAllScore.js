import { IS_BASE, setAllScores } from "../store";
import calcCellScore from "./calcCellScore";

/**
 * 重算所有空格（IS_BASE）的预览分。
 * 作弊开启时：显示「若放置该格可得几分」（半透明格也计入相邻）。
 * 作弊关闭时：清空预览分（置 0）。
 * @param {boolean} cheatMode
 * @param {ReadonlyArray<ReadonlyArray<number>>} status 当前 arrStatus 快照
 */
export default function calcAllScore(cheatMode, status) {
  const len = status.length;
  setAllScores((draft) => {
    for (let row = 0; row < len; ++row) {
      for (let col = 0; col < len; ++col) {
        if (status[row][col] !== IS_BASE) continue;
        draft[row][col] = cheatMode
          ? calcCellScore({ row, col, includeTranslucen: true })
          : 0;
      }
    }
  });
}
