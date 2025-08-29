<script>
  import { cx, cva } from "class-variance-authority";
  let {
    children,
    className,
    maxH = 60,
    insetShadow = false,
    ...restProps
  } = $props();
  const containerVariants = cva(
    "z-999 bg-base-100 overflow-y-scroll sticky h-fit",
    {
      variants: {
        maxH: {
          60: "max-h-[60vh]",
        },
        insetShadow: {
          true: "inset-shadow-sm",
        },
      },
    }
  );
</script>

<div
  class={cx(containerVariants({ maxH, insetShadow }), className)}
  {...restProps}
>
  {@render children?.()}
</div>
