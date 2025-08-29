<script>
  import Button from "@zr/ui/Button";
  import Floor from "./modules/Floor.svelte";
  import Badge from "@zr/ui/Badge";
  import Divider from "@zr/ui/Divider";
  const IS_TRANSLUCEN = -1;
  const IS_BASE = 0;
  let initArr = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  let arr = $state(initArr);
  let minusArrValue = [-1, -1, -2, -2, -2, -3, -3];
  let minusArrState = $state(new Array(minusArrValue.length).fill(false));
  let currentScore = $state(0);
  let totalScore = $state(0);
  function calcCellScore({ col, row }) {
    let len = arr.length;
    function _calcBase({ col, row }) {
      let result = 1;
      arr[row][col] = 1;
      for (let i = row - 1; i >= 0; --i) {
        let item = arr[i][col];
        if ([IS_BASE, IS_TRANSLUCEN].includes(Number(item))) {
          break;
        }
        result += 1;
        arr[row][col] = result;
      }
      for (let i = row + 1; i < len; ++i) {
        let item = arr[i][col];
        if ([IS_BASE, IS_TRANSLUCEN].includes(Number(item))) {
          break;
        }
        result += 1;
        arr[row][col] = result;
      }
      for (let j = col - 1; j >= 0; --j) {
        let item = arr[row][j];
        if ([IS_BASE, IS_TRANSLUCEN].includes(Number(item))) {
          break;
        }
        result = result + 1;
        arr[row][col] = result;
      }
      for (let j = col + 1; j < len; ++j) {
        let item = arr[row][j];
        if ([IS_BASE, IS_TRANSLUCEN].includes(Number(item))) {
          break;
        }
        result = result + 1;
        arr[row][col] = result;
      }
      return result;
    }
    function _calcSpecial({ row, col }) {
      let result = 0;
      for (let i = 0; i < len; ++i) {
        if ([IS_BASE, IS_TRANSLUCEN].includes(Number(arr[i][col]))) {
          break;
        }
        if (i === len - 1) {
          result = result + 2;
          arr[row][col] += result;
        }
      }
      for (let j = 0; j < len; ++j) {
        if ([IS_BASE, IS_TRANSLUCEN].includes(Number(arr[row][j]))) {
          break;
        }
        if (j === len - 1) {
          result = result + 7;
          arr[row][col] += result;
        }
      }
      for (let i = 0; i < len; ++i) {
        if (
          [IS_BASE, IS_TRANSLUCEN].includes(
            Number(arr[(row + i) % len][(col + i) % len])
          )
        ) {
          break;
        }
        if (i === len - 1) {
          result = result + 10;
          arr[row][col] += result;
        }
      }
      return result;
    }
    return _calcBase({ row, col }) + _calcSpecial({ row, col });
  }
  function handleCalcTotal() {
    let len = arr.length;
    function _calcMinus() {
      let result = minusArrValue
        .filter((_, index) => minusArrState[index])
        .reduce((pre, cur) => pre + cur, 0);
      minusArrState = new Array(minusArrValue.length).fill(false);
      return result;
    }
    let result = 0;
    for (let row = 0; row < len; ++row) {
      for (let col = 0; col < len; ++col) {
        let item = arr[row][col];
        if (item === IS_TRANSLUCEN) {
          result = result + calcCellScore({ row, col });
        }
      }
    }
    currentScore = result + _calcMinus();
    totalScore += currentScore;
  }
</script>

<div class="flex items-center justify-center">
  <div>
    {#each { length: 5 }, row}
      <div>
        {#each { length: 5 }, col}
          <Floor
            disable={Number(arr[row][col]) >= 1}
            isTranslucen={Number(arr[row][col]) === IS_TRANSLUCEN}
            onChange={(e) => {
              arr[row][col] = e.target.checked ? IS_TRANSLUCEN : 0;
            }}>{arr[row][col] >= 1 ? arr[row][col] : ""}</Floor
          >
        {/each}
      </div>
    {/each}
    <Divider />
    {#each { length: minusArrValue.length }, index}
      <Floor
        isTranslucen
        bind:checked={minusArrState[index]}
        onChange={(e) => (minusArrState[index] = e.target.checked)}
        >{minusArrValue[index]}</Floor
      >
    {/each}
  </div>
</div>
<div class="flex flex-col gap-2 p-2 items-end">
  <div>当前：<Badge>{currentScore}</Badge></div>
  <div>总分：<Badge color="primary">{totalScore}</Badge></div>
</div>

<div class="flex w-full justify-center gap-1 p-1">
  <Button
    style="flex-grow: 1"
    color="error"
    onclick={() => {
      location.reload();
    }}>重置</Button
  >
  <Button color="primary" style="flex-grow: 3" onclick={handleCalcTotal}
    >计算分数</Button
  >
</div>
