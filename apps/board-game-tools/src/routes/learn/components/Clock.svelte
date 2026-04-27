<script>
  import dayjs from "dayjs";
  import duration from "dayjs/plugin/duration";
  import NumberBlock from "./NumberBlock.svelte";
  dayjs.extend(duration);
  let { value = $bindable(0) } = $props();
  let hour = $derived(Math.floor(value / 60 / 60));
  let minute = $derived(Math.floor(value / 60));
  let second = $derived(value % 60);
</script>

<div class="flex">
  <NumberBlock value={hour} />
  <NumberBlock value={minute} />
  <NumberBlock value={second} />
</div>
