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
  <div class={cx("modal-box min-h-[40dvh] overflow-y-hidden", className)}>
    <h3 class="text-lg font-bold">{@render title?.()}</h3>
    {@render children?.()}
  </div>
</div>
