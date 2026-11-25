<script>
  import { fade } from "svelte/transition";
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";

  let {
    buttons,
    toggleIconClass = "icon-[material-symbols--more-horiz]",
    show = $bindable(false),
    direction = "left",
    className = "",
    ...restProps
  } = $props();

  const id = $props.id();

  const toggleStyle = cva("", {
    variants: {
      direction: {
        left: "order-2",
        right: "order-1",
      },
    },
  });

  const buttonStyle = cva("", {
    variants: {
      direction: {
        left: "order-1",
        right: "order-2",
      },
    },
  });
</script>

<div
  class={cn("inline-grid overflow-hidden relative items-center", className)}
  style="grid-template-columns: auto auto;"
  {...restProps}
>
  {#if show}
    <div
      id="{id}-actions"
      class={cn(
        "inline-flex justify-end items-center gap-2",
        buttonStyle({ direction: /** @type {any} */ (direction) }),
      )}
      transition:fade={{ duration: 300 }}
    >
      {@render buttons?.()}
    </div>
  {/if}
  <Button
    class={cn(
      toggleStyle({ direction: /** @type {any} */ (direction) }),
      "m-1",
      {
        "opacity-25": !show,
      },
    )}
    aria-controls="{id}-actions"
    aria-expanded={show}
    onclick={() => (show = !show)}
    circle
    responsive
  >
    <Icon responsive iconClass={toggleIconClass} />
  </Button>
</div>
