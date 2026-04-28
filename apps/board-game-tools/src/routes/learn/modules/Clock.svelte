<script>
  import dayjs from "dayjs";
  import duration from "dayjs/plugin/duration";
  import NumberBlock from "../components/NumberBlock.svelte";
  import { onDestroy, onMount } from "svelte";
  import { isLearning, value, operateTime } from "../store";
  dayjs.extend(duration);

  setInterval(() => {
    if ($isLearning) {
      $value = $value + 1;
    } else {
      $value = $value - 1;
    }
  }, 1000);

  onDestroy(() => {
    $operateTime = 0;
  });

  let hour = $derived(Math.floor($value / 60 / 60));
  let minute = $derived(Math.floor($value / 60));
  let second = $derived($value % 60);
</script>

<div class="flex">
  <NumberBlock value={hour} />
  <NumberBlock value={minute} />
  <NumberBlock value={second} />
</div>
