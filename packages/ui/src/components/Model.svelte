<script>
  import { cx, cva } from "class-variance-authority";
  let {
    children,
    className,
    fullScreenCloseAble = true,
    title,
    ...restProps
  } = $props();
  let dialog;
  export function showModal() {
    dialog.showModal();
  }
  export function close() {
    dialog.close();
  }
  const modalVariants = cva("modal", {
    variants: {},
  });
</script>

<dialog class="modal" bind:this={dialog}>
  <div class={cx("modal-box min-h-[40dvh]")}>
    <h3 class="font-bold text-lg">{@render title?.()}</h3>
    <div class={className} {...restProps}>
      {@render children?.()}
    </div>
  </div>
  {#if fullScreenCloseAble}
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  {:else}
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</button
      >
    </form>
  {/if}
</dialog>
