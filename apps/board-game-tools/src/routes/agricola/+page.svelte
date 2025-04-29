<script>
  import Steps from "@zr/ui/Steps";
  import Button from "@zr/ui/Button";
  import Icon from "@zr/ui/Icon";
  import Badge from "@zr/ui/Badge";
  import { socket } from "../../store";
  import { onMount } from "svelte";
  import { fromEvent } from "rxjs";
  import { debounceTime } from "rxjs/operators";

  let normalItems = [
    { title: "翻牌" },
    { title: "放置资源" },
    { title: "回合开始判定" },
    { title: "回收人物" },
    { title: "回合结束判定" },
  ];
  let specialItems = [
    { title: "收获" },
    { title: "交食物" },
    { title: "动物繁殖" },
  ];
  // 回合数
  let round = $state(1);
  // 特殊回合
  let isSpecialRound = $derived([4, 7, 9, 11, 13, 14].includes(round));
  // 当前步骤
  let currentStep = $state(-1);
  // 当前回合结束步骤
  let endStep = $derived(
    normalItems.length + (isSpecialRound ? specialItems.length : 0)
  );
  let subscription;

  onMount(() => {
    const socket$ = fromEvent($socket, "agricola");
    subscription = socket$.pipe(debounceTime(10)).subscribe((msg) => {
      round = msg.round;
      currentStep = msg.currentStep;
    });

    return () => {
      subscription?.unsubscribe();
    };
  });
  $effect(() => {
    if (currentStep >= endStep) {
      currentStep = -1;
      round++;
    }
    if (round > 14) {
      alert("游戏结束");
      round = 1;
    }
    $socket.emit("agricola", { round, currentStep });
  });
</script>

<div class="grid p-4" style="grid-template-rows: min-content 1fr min-content;">
  <div class="flex text-2xl items-center justify-center gap-x-2">
    <span>回合</span><Badge color="primary">{round}</Badge>
  </div>

  <div class="flex flex-col justify-around items-center">
    <Button
      color="primary"
      size="lg"
      circle
      className="scale-300"
      onclick={() => currentStep++}
    >
      <Icon iconClass="icon-[material-symbols--next-plan-rounded]" />
    </Button>
  </div>
  <div>
    <Button
      color="secondary"
      size="sm"
      onclick={() => currentStep >= 0 && currentStep--}>撤销</Button
    >
    <div class="grid" style="grid-template-columns: 1fr 1fr;">
      <Steps
        direction="vertical"
        color="primary"
        {currentStep}
        items={normalItems}
      >
        {#snippet children(i)}
          {normalItems[i]?.title}
        {/snippet}
      </Steps>
      {#if isSpecialRound}
        <Steps
          direction="vertical"
          color="primary"
          currentStep={currentStep - normalItems.length}
          items={specialItems}
        >
          {#snippet children(i)}
            {specialItems[i]?.title}
          {/snippet}
        </Steps>
      {/if}
    </div>
  </div>
</div>
