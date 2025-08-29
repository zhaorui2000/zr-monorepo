<script>
  import Badge from "@zr/ui/Badge";
  import { currentScore, totalScore } from "../store";
</script>

<div class="flex flex-col gap-2 p-2 grow items-end">
  <div>当前：<Badge>{$currentScore}</Badge></div>
  <div>总分：<Badge color="primary">{$totalScore}</Badge></div>
</div>
