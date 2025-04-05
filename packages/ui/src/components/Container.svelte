<script>
  import { cx } from "class-variance-authority";
  let { children, className, ...restProps } = $props();
</script>

<div
  class={cx(
    "p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 2xl:p-6 overflow-y-scroll overflow-x-hidden max-h-full",
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
