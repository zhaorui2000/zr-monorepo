<script>
  import { isLearning, value, operateTime } from "../store";
  import Button from "@zr/ui/Button";
  import dayjs from "dayjs";

  function updateValue() {
    $value = Math.floor(dayjs().diff(dayjs($operateTime)) / 1000);
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
      onclick={() => {
        $operateTime = dayjs().valueOf();
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
        updateValue();
        $operateTime = dayjs().valueOf();
        $value = Math.floor($value / 3);
      }}
      color="error"
      circle>结束</Button
    >
  </div>
</div>
