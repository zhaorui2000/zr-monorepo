<script>
  import { isLearning, value } from "../store";
  import Badge from "@zr/ui/Badge";
</script>

<div class="flex justify-end">
  <Badge size="lg" color={$isLearning ? "primary" : "success"}
    >{$isLearning ? "学习" : "休息"}</Badge
  >
  {#if !$isLearning && $value <= 0}
    <Badge size="lg" color="warning">休息结束</Badge>
  {/if}
  {#if $isLearning && $value >= 60 * 50}
    <Badge size="lg" color="warning">建议休息</Badge>
  {/if}
</div>
