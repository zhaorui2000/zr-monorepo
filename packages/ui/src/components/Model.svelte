<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";

  let {
    children,
    className = "",
    fullScreenCloseAble = true,
    fullScreenCloseable = undefined,
    title,
    isShow = $bindable(false),
    ...restProps
  } = $props();

  const id = $props.id();
  const titleId = `${id}-title`;
  const canClose = $derived(fullScreenCloseable ?? fullScreenCloseAble);
  const modalBoxVariants = cva("modal-box overflow-y-hidden flex flex-col");
</script>

<input
  type="checkbox"
  bind:checked={isShow}
  class="modal-toggle"
  {id}
  {...restProps}
/>
<div class="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
  <div class={cn(modalBoxVariants(), className)}>
    <h3 id={titleId} class="text-lg font-bold flex-shrink-0 py-2">
      {@render title?.()}
    </h3>
    <div class="flex-1 min-h-0 overflow-y-auto">
      {@render children?.()}
    </div>
  </div>
  {#if canClose}
    <label class="modal-backdrop" for={id} aria-label="关闭弹窗">Close</label>
  {/if}
</div>
