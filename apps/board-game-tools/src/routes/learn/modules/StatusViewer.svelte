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
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import { onMount } from "svelte";
  import isToday from "../utils/isToday";
  dayjs.extend(utc);
  onMount(() => {
    if (!isToday($lastRecordDate)) {
      $lastRecordDate = dayjs().format("YYYY-MM-DD");
      $isLearning = false;
      $totalTime = 0;
    }
  });
</script>

<Card>
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
</Card>
<Card>
  <div class="flex justify-around">
    {#if $isLearning}
      <Badge size="lg">开始时间：</Badge>
    {:else}
      <Badge size="lg">休息时间：</Badge>
    {/if}
    <Badge size="lg" color="primary"
      >{dayjs($operateTime).format("HH:mm:ss")}</Badge
    >
  </div>
</Card>
<Card>
  <div class="flex justify-around">
    <Badge size="lg">学习总时：</Badge>
    <Badge size="lg" color="primary"
      >{dayjs.utc($totalTime * 1000).format("HH:mm:ss")}</Badge
    >
  </div>
</Card>
