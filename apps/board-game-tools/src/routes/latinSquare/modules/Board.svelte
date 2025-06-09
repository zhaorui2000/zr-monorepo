<script>
  import generateRandomLatinSquare from "../utils/generateRandomLatinSquare";
  import { cx, cva } from "class-variance-authority";
  import NumberBlock from "@zr/ui/NumberBlock";
  const { n = 3 } = $props();
  let square = $state([]);
  $effect(() => {
    square = generateRandomLatinSquare(n);
  });
  export function refresh() {
    square = generateRandomLatinSquare(n);
  }
</script>

<div class="flex overflow-x-scroll w-fit">
  <div class={cx("grid h-fit")}>
    {#each square as row}
      <div
        class={cx("flex", {
          "gap-5 px-5 py-3": n <= 5,
          "gap-3 px-3 py-2": n > 5 && n <= 7,
          "gap-1 px-1 py-1": n > 7,
        })}
      >
        {#each row as col}
          <NumberBlock size="lg">{col}</NumberBlock>
        {/each}
      </div>
    {/each}
  </div>
</div>
