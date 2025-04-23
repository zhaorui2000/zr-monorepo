<script>
  import StickyContainer from "@zr/ui/StickyContainer";
  import { cx, cva } from "class-variance-authority";
  import { onMount } from "svelte";
  let { children, className, ...restProps } = $props();
  const stickyClass = cva("", {
    variants: {
      position: {
        top: ["-top-1 sm:-top-2 md:-top-3 lg:-top-4 xl:-top-5 2xl:-top-6"],
      },
    },
  });
</script>

<div
  class={cx(
    "p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 2xl:p-6 overflow-y-scroll overflow-x-hidden max-h-full",
    className
  )}
  {...restProps}
>
  {@render children?.({ stickyClass })}
</div>
