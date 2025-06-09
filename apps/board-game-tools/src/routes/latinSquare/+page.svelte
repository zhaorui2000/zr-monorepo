<script>
  import Button from "@zr/ui/Button";
  import Board from "./modules/Board.svelte";
  import Range from "@zr/ui/Range";
  import StickyPanel from "@zr/ui/StickyPanel";
  let n = $state(9);
  let boardRef = null;
</script>

<div
  class="grid overflow-auto gap-3 items-center justify-items-center"
  style="grid-template-rows: minmax(min-content,1fr) min-content;grid-template-columns: 100%;"
>
  <Board {n} bind:this={boardRef} />
  <StickyPanel className="w-full bottom-0 p-4 inset-shadow-sm">
    <Range bind:value={n} min={1} max={9} step={1} />
    <Button block color="primary" onclick={() => boardRef.refresh()}
      >重新生成</Button
    >
  </StickyPanel>
</div>
