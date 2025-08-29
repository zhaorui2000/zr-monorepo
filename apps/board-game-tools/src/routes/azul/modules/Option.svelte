<script>
  import Checkbox from "@zr/ui/Checkbox";
  import { produce } from "immer";
  import {
    isCheatMode,
    arrStatus,
    arr,
    calcAllScore,
    IS_BLOCK,
  } from "../store";
  function handleChangeCheatMode(e) {
    if (e.target.checked) {
      calcAllScore();
    } else {
      $arrStatus.forEach((_, rowIndex) => {
        $arrStatus[rowIndex].forEach((col, colIndex) => {
          if (col !== IS_BLOCK) {
            arr.set(
              produce(arr.get(), (draft) => {
                draft[rowIndex][colIndex] = 1;
              })
            );
          }
        });
      });
    }
  }
</script>

<div class="flex items-center">
  <Checkbox bind:checked={$isCheatMode} onchange={handleChangeCheatMode}
    >自动计算空块分数</Checkbox
  >
</div>
