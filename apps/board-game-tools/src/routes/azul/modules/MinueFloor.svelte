<script>
  import Floor from "../components/Floor.svelte";
  import { produce } from "immer";
  import { MINUS_ARRAY, minusArrState } from "../store";
</script>

<div>
  {#each { length: MINUS_ARRAY.length }, index}
    <Floor
      bind:checked={$minusArrState[index]}
      onChange={(e) =>
        minusArrState.set(
          produce(minusArrState.get(), (draft) => {
            draft[index] = e.target.checked;
          })
        )}>{MINUS_ARRAY[index]}</Floor
    >
  {/each}
</div>
