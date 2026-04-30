<script>
  import {
    isLearning,
    value,
    operateTime,
    totalTime,
    lastRecordDate,
  } from "../store";
  import Button from "@zr/ui/Button";
  import dayjs from "dayjs";

  function updateValue() {
    $value = Math.floor(dayjs().diff(dayjs($operateTime)) / 1000);
  }
  function handleEnd() {
    $isLearning = false;
    updateValue();
    $operateTime = dayjs().valueOf();
    $totalTime += $value;
    $value = Math.floor($value / 3);
  }
  function handleStart() {
    $operateTime = dayjs().valueOf();
    $isLearning = true;
    $value = 0;
    $lastRecordDate = dayjs().format("YYYY-MM-DD");
  }
</script>

<div class="flex justify-between items-center p-4">
  <div>
    <Button
      disabled={$operateTime === 0 || !$isLearning}
      onclick={() => {
        updateValue();
      }}>手动更新</Button
    >
  </div>
  <div class="flex justify-end gap-2">
    <Button
      size="lg"
      disabled={$isLearning}
      onclick={handleStart}
      color="primary"
      circle>开始</Button
    >
    <Button
      size="lg"
      disabled={!$isLearning}
      onclick={handleEnd}
      color="error"
      circle>结束</Button
    >
  </div>
</div>
