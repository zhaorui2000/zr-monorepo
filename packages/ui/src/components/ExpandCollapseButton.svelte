<script>
  import { fade } from "svelte/transition";
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";
  import { cva, cx } from "class-variance-authority";
  let {
    buttons,
    toggleIconClass = "icon-[material-symbols--more-horiz]",
    show = $bindable(false),
    direction = "left",
    className,
  } = $props();

  let toggleStyle = cva("", {
    variants: {
      direction: {
        left: ["order-2"],
        right: ["order-1"],
      },
    },
  });
  let buttonStyle = cva("", {
    variants: {
      direction: {
        left: ["order-1"],
        right: ["order-2"],
      },
    },
  });
</script>

<div
  class={cx("inline-grid overflow-hidden relative", className)}
  style="grid-template-columns: min-content min-content"
>
  {#if show}
    <div
      class="inline-flex justify-end items-center gap-2 order-2"
      transition:fade={{ duration: 300 }}
    >
      {@render buttons?.()}
    </div>
  {/if}
  <Button
    className={cx(toggleStyle({ direction }), "m-1", { "opacity-25": !show })}
    onclick={() => (show = !show)}
    circle
    responsive
  >
    <Icon responsive iconClass={toggleIconClass}></Icon>
  </Button>
</div>
