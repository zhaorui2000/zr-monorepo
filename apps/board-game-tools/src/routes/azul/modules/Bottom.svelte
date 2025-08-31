<script>
  import Button from "@zr/ui/Button";
  import { produce } from "immer";
  import calcCellScore from "../utils/calcCellScore";
  import {
    currentScore,
    totalScore,
    minusArrState,
    arrStatus,
    arr,
    IS_TRANSLUCEN,
    IS_BLOCK,
    MINUS_ARRAY,
  } from "../store";
  // --------------------- [ 计算减分 ] ---------------------
  function calcMinusScore() {
    let minusScore = MINUS_ARRAY.filter(
      (_, index) => $minusArrState[index]
    ).reduce((pre, cur) => pre + cur, 0);
    return minusScore;
  }
  // --------------------- [ 计算半透明格子分数 ] ---------------------
  function calcTranslucenScore() {
    let result = 0;
    let len = $arr.length;
    for (let row = 0; row < len; ++row) {
      for (let col = 0; col < len; ++col) {
        if ($arrStatus[row][col] !== IS_TRANSLUCEN) {
          continue;
        }
        result += calcCellScore({ row, col });
        arrStatus.set(
          produce(arrStatus.get(), (draft) => {
            draft[row][col] = IS_BLOCK;
          })
        );
      }
    }
    return result + calcMinusScore();
  }
  function handleConfirm() {
    currentScore.set(calcTranslucenScore());
    totalScore.set($totalScore + $currentScore);
    minusArrState.set(
      produce(minusArrState.get(), (draft) => {
        draft.fill(false);
      })
    );
  }
  function handleReset() {
    location.reload();
  }
</script>

<div class="flex w-full justify-center gap-1 p-1">
  <Button style="flex-grow: 1" color="error" onclick={handleReset}>重置</Button>
  <Button color="primary" style="flex-grow: 3" onclick={handleConfirm}
    >确定</Button
  >
</div>
