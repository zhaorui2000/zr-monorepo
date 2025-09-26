<script>
  import { cx, cva } from "class-variance-authority";
  import { v4 as uuid } from "uuid";
  let {
    children,
    className,
    fullScreenCloseAble = true,
    title,
    isShow = $bindable(false),
    ...restProps
  } = $props();
  const id = uuid();
</script>

<input
  type="checkbox"
  bind:checked={isShow}
  class="modal-toggle"
  {id}
  {...restProps}
/>
<div class="modal" role="dialog">
  <div class={cx("modal-box overflow-y-hidden flex flex-col", className)}>
    <h3 class="text-lg font-bold flex-shrink-0 py-2">{@render title?.()}</h3>
    <div class="flex-1 min-h-0 overflow-y-auto">
      {@render children?.()}
    </div>
  </div>
  {#if fullScreenCloseAble}
    <label class="modal-backdrop" for={id}>Close</label>
  {/if}
</div>
