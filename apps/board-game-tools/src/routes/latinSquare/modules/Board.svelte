<script>
  import generateRandomLatinSquare from "../utils/generateRandomLatinSquare";
  import { cx } from "class-variance-authority";
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
  <div class={cx("grid h-fit py-3 gap-3")}>
    {#each square as row}
      <div
        class={cx("flex", {
          "px-3 gap-3": n <= 7,
          "px-1 gap-1": n > 7,
        })}
      >
        {#each row as col}
          <div
            class={cx(
              `flex items-center justify-center
                       bg-gradient-to-br from-blue-50 to-indigo-100
                       rounded-lg border border-gray-200 shadow-sm
                       hover:shadow-md hover:from-blue-100 hover:to-indigo-200
                       transition-all duration-300 ease-in-out
                       font-medium text-gray-700`,
              {
                "w-16 h-16": n <= 4,
                "w-12 h-12": n <= 6,
                "w-8 h-8": n > 6,
              }
            )}
          >
            {col}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
