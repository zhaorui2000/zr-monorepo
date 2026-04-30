<script>
  import {
    isLearning,
    value,
    operateTime,
    totalTime,
    lastRecordDate,
  } from "../store";
  import Badge from "@zr/ui/Badge";
  import Card from "@zr/ui/Card";
  import Button from "@zr/ui/Button";
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import isToday from "../utils/isToday";
  import copy from "@zr/utils/Dom/copy";
  import formatSeconds from "@zr/utils/String/formatSeconds";

  onMount(() => {
    if (!isToday($lastRecordDate)) {
      $lastRecordDate = dayjs().format("YYYY-MM-DD");
      $isLearning = false;
      $totalTime = 0;
    }
  });

  let statusColor = $derived($isLearning ? "primary" : "success");
  let statusText = $derived($isLearning ? "学习" : "休息");
  let showRestEnd = $derived(!$isLearning && $value <= 0);
  let showSuggestRest = $derived($isLearning && $value >= 3000);

  function handleCopyPrompt() {
    const endTime = dayjs($operateTime)
      .add(Math.max($value, 0), "second")
      .format("HH:mm");
    copy(`${endTime} 提醒我休息结束`);
  }
</script>

<Card>
  <div class="flex justify-end gap-2">
    <Badge size="lg" color={statusColor}>{statusText}</Badge>
    {#if showRestEnd}
      <Badge size="lg" color="warning">休息结束</Badge>
    {/if}
    {#if showSuggestRest}
      <Badge size="lg" color="warning">建议休息</Badge>
    {/if}
  </div>
</Card>
<Card>
  <div class="flex justify-around items-center">
    {#if $isLearning}
      <Badge size="lg">开始时间：</Badge>
    {:else}
      <div class="flex items-center gap-2">
        <Badge size="lg">休息时间：</Badge>
        <Button size="sm" onclick={handleCopyPrompt}>复制提示词</Button>
      </div>
    {/if}
    <Badge size="lg" color="primary"
      >{dayjs($operateTime).format("HH:mm:ss")}</Badge
    >
  </div>
</Card>
<Card>
  <div class="flex justify-around">
    <Badge size="lg">学习总时：</Badge>
    <Badge size="lg" color="primary">{formatSeconds($totalTime)}</Badge>
  </div>
</Card>
