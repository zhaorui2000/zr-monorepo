<script>
  import generateRandomLatinSquare from "../utils/generateRandomLatinSquare";
  const { n = 3 } = $props();
  let square = $state([]);
  $effect(() => {
    square = generateRandomLatinSquare(n);
  });
  export function refresh() {
    square = generateRandomLatinSquare(n);
  }
</script>

<div class="flex overflow-x-scroll w-full">
  <div class="grid gap-3 h-fit py-3">
    {#each square as row}
      <div class="flex gap-3 px-3">
        {#each row as col}
          <div
            class="w-12 h-12 flex items-center justify-center
                       bg-gradient-to-br from-blue-50 to-indigo-100
                       rounded-lg border border-gray-200 shadow-sm
                       hover:shadow-md hover:from-blue-100 hover:to-indigo-200
                       transition-all duration-300 ease-in-out
                       font-medium text-gray-700"
          >
            {col}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
