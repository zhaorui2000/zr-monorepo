<script>
  import Model from "@zr/ui/Model";
  import TEMp from "../MCQs/Front.svelte";
  import "@zr/ui/index.js";
  import ThemeController from "@zr/ui/ThemeController";
  import Button from "@zr/ui/Button";
  import Range from "@zr/ui/Range";
  import Icon from "@zr/ui/Icon";
  import { baseFontSize } from "./store";
  let dialog;
  const handleChangeFontSize = (e) => {
    document.documentElement.style.fontSize = `${e.target.value}px`;
    $baseFontSize = e.target.value;
  };
  $effect(() => {
    document.documentElement.style.fontSize = `${$baseFontSize}px`;
  });
</script>

<Button
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
  <ThemeController className="max-h-[7rem]" />
  <span>基础字体(px)：</span>
  <div>
    <Range
      onchange={handleChangeFontSize}
      initValue={$baseFontSize}
      min={14}
      max={22}
      step={2}
    ></Range>
  </div>
</Model>
<TEMp />
