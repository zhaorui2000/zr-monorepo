<script>
  import dayjs from "dayjs";
  import duration from "dayjs/plugin/duration";
  import NumberBlock from "../components/NumberBlock.svelte";
  import { onDestroy } from "svelte";
  import { isLearning, value } from "../store";
  dayjs.extend(duration);

  $isLearning = false;
  $value = 0;
  let hiddenTime = $state(0);

  setInterval(() => {
    if ($isLearning) {
      $value = $value + 1;
    } else {
      $value = $value - 1;
    }
  }, 1000);

  function handleVisibilityChange() {
    if (document.visibilityState === "hidden") {
      hiddenTime = dayjs();
    } else {
      $value = Math.floor(dayjs().diff(hiddenTime) / 1000);
      console.log($value);
    }
  }
  onDestroy(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
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
