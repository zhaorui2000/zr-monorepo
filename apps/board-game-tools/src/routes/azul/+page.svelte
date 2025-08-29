<script>
  import Button from "@zr/ui/Button";
  import Floor from "./modules/Floor.svelte";
  import Badge from "@zr/ui/Badge";
  import Divider from "@zr/ui/Divider";
  import Checkbox from "@zr/ui/Checkbox";
  import { isCheatMode } from "./store";
  const IS_TRANSLUCEN = -1;
  const IS_BASE = 0;
  const IS_BLOCK = 1;
  let initArr = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let initState = [
    [IS_BASE, IS_BASE, IS_BASE, IS_BASE, IS_BASE],
    [IS_BASE, IS_BASE, IS_BASE, IS_BASE, IS_BASE],
    [IS_BASE, IS_BASE, IS_BASE, IS_BASE, IS_BASE],
    [IS_BASE, IS_BASE, IS_BASE, IS_BASE, IS_BASE],
    [IS_BASE, IS_BASE, IS_BASE, IS_BASE, IS_BASE],
  ];
  let arr = $state(initArr);
  let arrStatus = $state(initState);
  let minusArrValue = [-1, -1, -2, -2, -2, -3, -3];
  let minusArrState = $state(new Array(minusArrValue.length).fill(false));
  let currentScore = $state(0);
  let totalScore = $state(0);
  // --------------------- [ 计算每个格子的分数 ] ---------------------
  function calcCellScore({ row, col, includeTranslucen = false }) {
    let len = arr.length;
    let validStatus = includeTranslucen
      ? [IS_BLOCK, IS_TRANSLUCEN]
      : [IS_BLOCK];
    // --------------------- [ 计算基本分 ] ---------------------
    function _calcBase() {
      let result = 1;
      // --------------------- [ 计算行 ] ---------------------
      for (let j = col - 1; j >= 0; --j) {
        if (validStatus.includes(arrStatus[row][j])) {
          result++;
        } else {
          break;
        }
      }
      for (let j = col + 1; j < len; ++j) {
        if (validStatus.includes(arrStatus[row][j])) {
          result++;
        } else {
          break;
        }
      }
      // --------------------- [ 计算列 ] ---------------------
      for (let i = row - 1; i >= 0; --i) {
        if (validStatus.includes(arrStatus[i][col])) {
          result++;
        } else {
          break;
        }
      }
      for (let i = row + 1; i < len; ++i) {
        if (validStatus.includes(arrStatus[i][col])) {
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
      // --------------------- [ 铺满一行 +7 ] ---------------------
      for (let j = 1; j < len; ++j) {
        if (!validStatus.includes(arrStatus[row][(col + j) % len])) {
          break;
        }
        if (j === len - 1) {
          result += 7;
        }
      }
      // --------------------- [ 铺满一列 +2] ---------------------
      for (let i = 1; i < len; ++i) {
        if (!validStatus.includes(arrStatus[(row + i) % len][col])) {
          break;
        }
        if (i === len - 1) {
          result += 2;
        }
      }
      // --------------------- [ 铺满一个颜色 +10] ---------------------
      for (let i = 1; i < len; ++i) {
        if (
          !validStatus.includes(arrStatus[(row + i) % len][(col + i) % len])
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
    arr[row][col] = _calcBase() + _calcSpecial();
    return arr[row][col];
  }
  // --------------------- [ 计算减分 ] ---------------------
  function calcMinusScore() {
    let minusScore = minusArrValue
      .filter((_, index) => minusArrState[index])
      .reduce((pre, cur) => pre + cur, 0);
    return minusScore;
  }
  // --------------------- [ 计算透明格子分数 ] ---------------------
  function calcTranslucenScore() {
    let result = 0;
    let len = arr.length;
    for (let row = 0; row < len; ++row) {
      for (let col = 0; col < len; ++col) {
        if (arrStatus[row][col] !== IS_TRANSLUCEN) {
          continue;
        }
        result += calcCellScore({ row, col });
        arrStatus[row][col] = IS_BLOCK;
      }
    }
    return result + calcMinusScore();
  }
  function calcAllScore() {
    if (!$isCheatMode) {
      return;
    }
    let result = 0;
    let len = arr.length;
    for (let row = 0; row < len; ++row) {
      for (let col = 0; col < len; ++col) {
        result = 0;
        if (arrStatus[row][col] === IS_BASE) {
          result += calcCellScore({ row, col, includeTranslucen: true });
          arr[row][col] = result;
        }
      }
    }
  }
</script>

<div class="flex items-center justify-center">
  <div>
    {#each { length: 5 }, row}
      <div>
        {#each { length: 5 }, col}
          <Floor
            disable={Number(arrStatus[row][col]) === IS_BLOCK}
            isTranslucen={Number(arrStatus[row][col]) === IS_TRANSLUCEN}
            onChange={(e) => {
              arrStatus[row][col] = e.target.checked ? IS_TRANSLUCEN : IS_BASE;
              calcAllScore();
            }}
            >{$isCheatMode || arrStatus[row][col] === IS_BLOCK
              ? arr[row][col]
              : ""}</Floor
          >
        {/each}
      </div>
    {/each}
    <Divider />
    {#each { length: minusArrValue.length }, index}
      <Floor
        bind:checked={minusArrState[index]}
        onChange={(e) => (minusArrState[index] = e.target.checked)}
        >{minusArrValue[index]}</Floor
      >
    {/each}
  </div>
</div>
<div class="flex px-2">
  <Checkbox
    bind:checked={$isCheatMode}
    onchange={(e) => {
      if (e.target.checked) {
        calcAllScore();
      } else {
        arrStatus.forEach((_, rowIndex) => {
          arrStatus[rowIndex].forEach((_, colIndex) => {
            if (arrStatus[rowIndex][colIndex] !== IS_BLOCK) {
              arr[rowIndex][colIndex] = 1;
            }
          });
        });
      }
    }}>自动计算空块分数</Checkbox
  >
  <div class="flex flex-col gap-2 p-2 grow items-end">
    <div>当前：<Badge>{currentScore}</Badge></div>
    <div>总分：<Badge color="primary">{totalScore}</Badge></div>
  </div>
</div>

<div class="flex w-full justify-center gap-1 p-1">
  <Button
    style="flex-grow: 1"
    color="error"
    onclick={() => {
      location.reload();
    }}>重置</Button
  >
  <Button
    color="primary"
    style="flex-grow: 3"
    onclick={() => {
      currentScore = calcTranslucenScore();
      totalScore += currentScore;
      minusArrState = new Array(minusArrValue.length).fill(false);
    }}>计算分数</Button
  >
</div>
