<script>
  import Button from "@zr/ui/Button";
  import Floor from "./modules/Floor.svelte";
  import Badge from "@zr/ui/Badge";
  let initArr = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  let arr = $state(initArr);
  let currentScore = $state(0);
  let totalScore = $state(0);
  function handleCalc() {
    let len = arr.length;
    function _calcBase({ col, row }) {
      let result = 1;
      arr[row][col] = 1;
      for (let i = row - 1; i >= 0; --i) {
        let item = arr[i][col];
        if ([0, 2].includes(Number(item))) {
          break;
        }
        result += 1;
      }
      for (let i = row + 1; i < len; ++i) {
        let item = arr[i][col];
        if ([0, 2].includes(Number(item))) {
          break;
        }
        result += 1;
      }
      for (let j = col - 1; j >= 0; --j) {
        let item = arr[row][j];
        if ([0, 2].includes(Number(item))) {
          break;
        }
        result = result + 1;
      }
      for (let j = col + 1; j < len; ++j) {
        let item = arr[row][j];
        if ([0, 2].includes(Number(item))) {
          break;
        }
        result = result + 1;
      }

      return result;
    }
    function _calcSpecial({ row, col }) {
      let result = 0;
      for (let i = 0; i < len; ++i) {
        if ([0, 2].includes(Number(arr[i][col]))) {
          break;
        }
        if (i === len - 1) {
          result = result + 2;
        }
      }
      for (let j = 0; j < len; ++j) {
        if ([0, 2].includes(Number(arr[row][j]))) {
          break;
        }
        if (j === len - 1) {
          result = result + 7;
        }
      }
      for (let i = 0; i < len; ++i) {
        if ([0, 2].includes(Number(arr[(row + i) % len][(col + i) % len]))) {
          break;
        }
        if (i === len - 1) {
          result = result + 10;
        }
      }
      return result;
    }
    let result = 0;
    for (let row = 0; row < len; ++row) {
      for (let col = 0; col < len; ++col) {
        let item = arr[row][col];
        if (item === 2) {
          result =
            result + _calcBase({ row, col }) + _calcSpecial({ row, col });
        }
      }
    }
    currentScore = result;
    totalScore += currentScore;
  }
</script>

<div class="flex items-center justify-center">
  <div>
    {#each { length: 5 }, row}
      <div>
        {#each { length: 5 }, col}
          <Floor
            disable={Number(arr[row][col]) === 1}
            isTranslucen={Number(arr[row][col]) === 2}
            onChange={(e) => {
              arr[row][col] = e.target.checked ? 2 : 0;
            }}
          ></Floor>
        {/each}
      </div>
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
  <Button color="primary" style="flex-grow: 3" onclick={handleCalc}
    >计算分数</Button
  >
</div>
