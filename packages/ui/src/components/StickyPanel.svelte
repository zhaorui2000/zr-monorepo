<script>
  import { cx, cva } from "class-variance-authority";
  let { children, className, maxH = 60, ...restProps } = $props();
  const containerVariants = cva(
    "z-999 bg-base-100 overflow-y-scroll sticky h-fit",
    {
      variants: {
        maxH: {
          60: "max-h-[60vh]",
        },
      },
    }
  );
</script>

<div class={cx(containerVariants({ maxH }), className)} {...restProps}>
  {@render children?.()}
</div>
