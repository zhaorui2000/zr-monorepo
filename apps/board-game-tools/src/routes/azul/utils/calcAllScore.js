import { isCheatMode, arr, arrStatus, IS_BASE } from "./../store";
import calcCellScore from "./calcCellScore";
import { produce } from "immer";
export default function calcAllScore() {
  if (!isCheatMode.get()) {
    return;
  }
  let result = 0;
  let len = arr.get().length;
  for (let row = 0; row < len; ++row) {
    for (let col = 0; col < len; ++col) {
      result = 0;
      if (arrStatus.get()[row][col] === IS_BASE) {
        result += calcCellScore({ row, col, includeTranslucen: true });
        arr.set(
          produce(arr.get(), (draft) => {
            draft[row][col] = result;
          })
        );
      }
    }
  }
}
