<script>
  import dayjs from "dayjs";
  import duration from "dayjs/plugin/duration";
  import Clock from "./components/Clock.svelte";
  import Button from "@zr/ui/Button";
  import Card from "@zr/ui/Card";
  import StatusViewer from "./modules/StatusViewer.svelte";
  import { isLearning, value } from "./store";

  dayjs.extend(duration);

  $isLearning = false;
  $value = 0;

  setInterval(() => {
    if ($isLearning) {
      $value = $value + 1;
    } else {
      $value = $value - 1;
    }
  }, 1000);
</script>

<div class="p-4">
  <Clock value={$value}></Clock>
  <Card>
    <StatusViewer></StatusViewer>
  </Card>
</div>
<div class="flex justify-end gap-2 p-4">
  <Button
    size="lg"
    disabled={$isLearning}
    onclick={() => {
      $isLearning = true;
      $value = 0;
    }}
    color="primary"
    circle>开始</Button
  >
  <Button
    size="lg"
    disabled={!$isLearning}
    onclick={() => {
      $isLearning = false;
      $value = Math.floor($value / 3);
    }}
    color="error"
    circle>结束</Button
  >
</div>
