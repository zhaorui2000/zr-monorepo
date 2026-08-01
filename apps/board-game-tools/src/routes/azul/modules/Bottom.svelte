<script>
  import Button from "@zr/ui/Button";
  import calcCellScore from "../utils/calcCellScore";
  import {
    currentScore,
    totalScore,
    minusArrState,
    arrStatus,
    IS_TRANSLUCEN,
    IS_BLOCK,
    MINUS_ARRAY,
    BOARD_SIZE,
    setCellScore,
    setCellStatus,
    commitHistory,
    undo,
    clearMinus,
    history,
    resetGame,
  } from "../store";

  // 减分：已勾选的减分位求和
  function calcMinusScore() {
    return MINUS_ARRAY.filter((_, index) => $minusArrState[index]).reduce(
      (pre, cur) => pre + cur,
      0,
    );
  }

  // 半透明格计分（保留原始逐格逻辑：相邻半透明格不互计）
  function calcTranslucenScore() {
    let result = 0;
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if ($arrStatus[row][col] !== IS_TRANSLUCEN) continue;
        const score = calcCellScore({ row, col });
        setCellScore(row, col, score);
        setCellStatus(row, col, IS_BLOCK);
        result += score;
      }
    }
    return result + calcMinusScore();
  }

  function handleConfirm() {
    commitHistory();
    const score = calcTranslucenScore();
    currentScore.set(score);
    totalScore.set($totalScore + score);
    clearMinus();
  }

  function handleUndo() {
    if ($history.length === 0) return;
    undo(1);
  }
</script>

<div class="flex w-full justify-center gap-1 p-1">
  <Button style="flex-grow: 1" color="error" onclick={resetGame}>重置</Button>
  <Button
    style="flex-grow: 1"
    disabled={$history.length === 0}
    onclick={handleUndo}>撤销({$history.length})</Button
  >
  <Button style="flex-grow: 3" color="primary" onclick={handleConfirm}
    >确定</Button
  >
</div>
