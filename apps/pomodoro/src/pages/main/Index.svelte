<script>
  import StartButton from "./module/StartButton.svelte";
  import FinishButton from "./module/FinishButton.svelte";
  import TimeRemaining from "./module/TimeRemaining.svelte";
  import applaudMp3 from "@assets/applaud.mp3";
  import useClickAnywhere from "@zr/svelte-hooks/useClickAnywhere.svelte.js";
  import notificationPlugins from "@utils/notificationPlugins";
  import startNotify from "./utils/startNotify";
  import endNotify from "./utils/endNotify";
  import updateNotify from "./utils/updateNotify";
  import {
    tomatoActor,
    start,
    finish,
    timeRemaining,
    timeDuration,
  } from "./store";
  import { onMount, onDestroy } from "svelte";
  import * as rxjs from "rxjs";

  let interval = null;
  let audio = null;

  const { startListen, stopListen } = useClickAnywhere(() => {
    audio.pause();
  });
  onMount(() => {
    startListen();
    $tomatoActor.start();
    audio = new Audio(applaudMp3);
    audio.loop = true;
  });

  onDestroy(() => {
    stopListen();
  });

  $tomatoActor.subscribe((state) => {
    $timeRemaining = $timeDuration[state.value] ?? $timeRemaining;
  });

  $start = function () {
    startNotify($timeRemaining);
    // 倒计时
    interval = rxjs.interval(1000).subscribe(() => {
      $timeRemaining--;
      updateNotify($timeRemaining);
      if ($timeRemaining <= 0) {
        $tomatoActor.send({ type: "finish" });
        audio.play();
        interval.unsubscribe();
      }
    });
  };

  $finish = function () {
    endNotify({
      title: "🍅 完成",
      text: $timeRemaining <= 1 ? "任务完成 🎉 " : "手动结束",
    });
    interval.unsubscribe();
  };
</script>

<div class="grid justify-center items-center w-full h-full">
  <div class="flex flex-col h-fit w-full justify-center">
    <TimeRemaining />
    <StartButton />
    <FinishButton />
  </div>
</div>
