<script>
  import Floor from "../components/Floor.svelte";
  import { MINUS_ARRAY, minusArrState, toggleMinus } from "../store";

  /** @param {number} index */
  function handleToggle(index) {
    toggleMinus(index, !$minusArrState[index]);
  }
</script>

<div class="flex flex-wrap justify-center gap-2">
  {#each MINUS_ARRAY as value, index}
    <Floor checked={$minusArrState[index]} onChange={() => handleToggle(index)}
      >{value}</Floor
    >
  {/each}
</div>
