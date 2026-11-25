<script>
  import Button from "@zr/ui/Button";
  import Icon from "@zr/ui/Icon";
  import Model from "@zr/ui/Model";
  import ThemeController from "@zr/ui/ThemeController";
  import Range from "@zr/ui/Range";
  import { baseFontSize } from "./../store";

  let isShow = $state(false);
  /** @type {any} */
  let themeControllerRef;

  $effect(() => {
    document.documentElement.style.fontSize = `${$baseFontSize}px`;
  });
</script>

<Button
  responsive
  circle
  className="fixed left-1 z-dropdown text-[40px] opacity-60 hover:opacity-100 focus-visible:opacity-100"
  style="top: max(0.25rem, env(safe-area-inset-top)); left: max(0.25rem, env(safe-area-inset-left));"
  aria-label="打开设置"
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

<Model bind:isShow className="w-[min(28rem,calc(100vw-2rem))]">
  {#snippet title()}
    设置
  {/snippet}
  <div class="grid gap-4 p-4">
    <div class="grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-center">
      <div class="whitespace-nowrap">主题</div>
      <div class="flex min-w-0 flex-wrap items-center gap-2">
        <ThemeController
          bind:this={themeControllerRef}
          className="max-h-[10rem]"
        />
        <Button size="sm" onclick={() => themeControllerRef?.randomTheme()}>
          随机
        </Button>
      </div>
    </div>
    <div class="grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-center">
      <div class="whitespace-nowrap">基础字体</div>
      <Range
        bind:value={$baseFontSize}
        aria-label="基础字体大小"
        min={16}
        max={32}
        step={4}
      />
    </div>
  </div>
</Model>
