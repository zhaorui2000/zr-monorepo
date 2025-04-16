<script>
  import Button from "@zr/ui/Button";
  import Icon from "@zr/ui/Icon";
  import Model from "@zr/ui/Model";
  import ThemeController from "@zr/ui/ThemeController";
  import Range from "@zr/ui/Range";
  import { baseFontSize } from "./../store";

  let dialog;
  let theme;

  const handleChangeFontSize = (e) => {
    document.documentElement.style.fontSize = `${e.target.value}px`;
    $baseFontSize = e.target.value;
  };
  $effect(() => {
    document.documentElement.style.fontSize = `${$baseFontSize}px`;
  });
</script>

<Button
  responsive
  circle
  className="fixed top-1 left-1 z-1 text-[40px] opacity-25"
  onclick={() => dialog.showModal()}
>
  <Icon
    className="text-2xl"
    color="neutral"
    iconClass="icon-[material-symbols--tv-options-input-settings-outline-rounded]"
  ></Icon>
</Button>

<Model
  bind:this={dialog}
  className="grid items-center gap-y-4"
  style="grid-template-rows: min-content min-content;grid-template-columns: 1fr 3fr;"
>
  {#snippet title()}
    设置
  {/snippet}
  <span>主题：</span>
  <div>
    <ThemeController bind:this={theme} className="max-h-[7rem]" />
    <Button size="sm" onclick={() => theme.randomTheme()}>随机</Button>
  </div>
  <span>基础字体(px)：</span>
  <Range
    onchange={handleChangeFontSize}
    initValue={$baseFontSize}
    min={16}
    max={24}
    step={2}
  ></Range>
</Model>
