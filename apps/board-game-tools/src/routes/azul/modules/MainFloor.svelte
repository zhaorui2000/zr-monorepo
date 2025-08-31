<script>
  import Floor from "../components/Floor.svelte";
  import { produce } from "immer";
  import calcAllScore from "../utils/calcAllScore";
  import {
    arrStatus,
    arr,
    IS_BLOCK,
    IS_TRANSLUCEN,
    isCheatMode,
    IS_BASE,
  } from "../store";
  function isShowFlowMsg({ row, col }) {
    return $isCheatMode || $arrStatus[row][col] === IS_BLOCK;
  }
  function handleChangeFloor({ e, row, col }) {
    arrStatus.set(
      produce(arrStatus.get(), (draft) => {
        draft[row][col] = e.target.checked ? IS_TRANSLUCEN : IS_BASE;
      })
    );
    calcAllScore();
  }
</script>

<div>
  {#each { length: 5 }, row}
    <div>
      {#each { length: 5 }, col}
        <Floor
          disable={Number($arrStatus[row][col]) === IS_BLOCK}
          isTranslucen={Number($arrStatus[row][col]) === IS_TRANSLUCEN}
          onChange={(e) => handleChangeFloor({ e, row, col })}
          >{isShowFlowMsg({ row, col }) ? $arr[row][col] : ""}</Floor
        >
      {/each}
    </div>
  {/each}
</div>
