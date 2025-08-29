<script>
  import Badge from "@zr/ui/Badge";
  import { currentScore, totalScore } from "../store";
</script>

<div class="flex pt-4 pb-2 gap-6 justify-center">
  <div>当前：<Badge>{$currentScore}</Badge></div>
  <div>总分：<Badge color="primary">{$totalScore}</Badge></div>
</div>
