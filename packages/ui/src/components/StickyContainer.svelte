<script>
  import { cx } from "class-variance-authority";
  let { children, className, ...restProps } = $props();
</script>

<div
  class={cx(
    "z-999 bg-base-100 overflow-y-scroll sticky max-h-[60vh] h-fit",
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
