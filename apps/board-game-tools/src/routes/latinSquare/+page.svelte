<script>
  import Button from "@zr/ui/Button";
  import Board from "./modules/Board.svelte";
  import Range from "@zr/ui/Range";
  let n = $state(5);
  let boardRef = null;
</script>

<div
  class="grid overflow-auto gap-3"
  style="grid-template-rows:1fr min-content"
>
  <Board {n} bind:this={boardRef} />
  <div class="p-2">
    <Range bind:value={n} min={1} max={9} step={1} />
    <Button block color="primary" onclick={() => boardRef.refresh()}
      >重新生成</Button
    >
  </div>
</div>
