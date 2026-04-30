<script>
  import NumberBlock from "../components/NumberBlock.svelte";
  import { onMount, onDestroy } from "svelte";
  import { isLearning, value, operateTime } from "../store";
  import isToday from "../utils/isToday";

  let timer;

  onMount(() => {
    if (!isToday($operateTime)) {
      $value = 0;
    }
    timer = setInterval(() => {
      $value += $isLearning ? 1 : -1;
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(timer);
    $operateTime = 0;
  });

  let hour = $derived(Math.floor($value / 3600));
  let minute = $derived(Math.floor($value / 60) % 60);
  let second = $derived($value % 60);
</script>

<div class="flex">
  <NumberBlock value={hour} />
  <NumberBlock value={minute} />
  <NumberBlock value={second} />
</div>
