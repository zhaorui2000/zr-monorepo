<script>
  import { cva } from "class-variance-authority";
  import Button from "./Button.svelte";
  import { cn } from "./common/cn.js";

  let {
    children,
    open,
    close,
    mainAction,
    flower = false,
    show = $bindable(true),
    color = "primary",
    size = "lg",
    className = "",
    ...restProps
  } = $props();

  const fabVariants = cva("fab", {
    variants: {
      flower: {
        true: "fab-flower",
      },
    },
  });
</script>

{#if show}
  <div class={cn(fabVariants({ flower }), className)} {...restProps}>
    <Button {color} {size} circle type="button" aria-label="打开操作菜单">
      {@render open?.()}
    </Button>
    {#if mainAction}
      <div class="fab-main-action">
        {@render mainAction?.()}
      </div>
    {/if}
    {#if close}
      <div class="fab-close">
        {@render close?.()}
      </div>
    {/if}
    {@render children?.()}
  </div>
{/if}
