<script>
  import { isLearning, value } from "../store";
  import Button from "@zr/ui/Button";
</script>

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
