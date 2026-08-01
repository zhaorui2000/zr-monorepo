<script>
  import Floor from "../components/Floor.svelte";
  import calcAllScore from "../utils/calcAllScore";
  import {
    isCheatMode,
    arrStatus,
    arr,
    IS_BASE,
    IS_BLOCK,
    IS_TRANSLUCEN,
    BOARD_SIZE,
    setCellStatus,
  } from "../store";

  // 作弊模式或已锁定时显示分数
  /** @param {number} row @param {number} col */
  function isShowScore(row, col) {
    return $isCheatMode || $arrStatus[row][col] === IS_BLOCK;
  }

  // 点击切换：空 ⇄ 半透明（已锁定格 disable，不会触发）
  /** @param {number} row @param {number} col */
  function handleToggle(row, col) {
    const current = $arrStatus[row][col];
    setCellStatus(row, col, current === IS_BASE ? IS_TRANSLUCEN : IS_BASE);
  }

  // 作弊模式或任意格子状态变化时，重算空格预览分
  $effect(() => {
    calcAllScore($isCheatMode, $arrStatus);
  });
</script>

<div class="flex flex-col items-center gap-2">
  {#each Array(BOARD_SIZE) as _, row}
    <div class="flex gap-2">
      {#each Array(BOARD_SIZE) as _, col}
        <Floor
          checked={Number($arrStatus[row][col]) !== IS_BASE}
          isTranslucen={Number($arrStatus[row][col]) === IS_TRANSLUCEN}
          disable={Number($arrStatus[row][col]) === IS_BLOCK}
          onChange={() => handleToggle(row, col)}
        >
          {isShowScore(row, col) ? $arr[row][col] : ""}
        </Floor>
      {/each}
    </div>
  {/each}
</div>
