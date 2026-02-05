<script>
  import Button from "@zr/ui/Button";
  import Icon from "@zr/ui/Icon";
  import Model from "@zr/ui/Model";
  import ThemeController from "@zr/ui/ThemeController";
  import Range from "@zr/ui/Range";
  import { baseFontSize } from "./../store";

  let isShow = $state(false);
  let themeControllerRef;

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
  onclick={() => {
    isShow = true;
  }}
>
  <Icon
    responsive
    scale={1.5}
    color="neutral"
    iconClass="icon-[material-symbols--tv-options-input-settings-outline-rounded]"
  ></Icon>
</Button>

<Model
  bind:isShow
  className="grid items-center gap-y-4"
  style="grid-template-rows: min-content min-content;grid-template-columns: 1fr 3fr;"
>
  {#snippet title()}
    设置
  {/snippet}
  <div class="flex flex-col gap-y-4">
    <div class="flex items-center gap-x-4">
      <div class="whitespace-nowrap">主题</div>
      <div>
        <ThemeController bind:this={themeControllerRef} className="max-h-[7rem]" />
        <Button size="sm" onclick={() => themeControllerRef.randomTheme()}>随机</Button>
      </div>
    </div>
    <div class="flex items-center gap-x-4">
      <div class="whitespace-nowrap">基础字体</div>
      <Range
        onchange={handleChangeFontSize}
        initValue={$baseFontSize}
        min={16}
        max={32}
        step={4}
      ></Range>
    </div>
  </div>
</Model>
