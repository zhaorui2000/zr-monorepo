<script>
  import { cva, cx } from "class-variance-authority";
  let {
    children,
    open,
    close,
    mainAction,
    flower = false,
    show = $bindable(true),
  } = $props();
  const FABVariants = cva("fab", {
    variants: {
      flower: {
        true: ["fab-flower"],
      },
    },
  });
</script>

{#if show}
  <div class={cx(FABVariants({ flower }))}>
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-primary">
      {@render open?.()}
    </div>
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
