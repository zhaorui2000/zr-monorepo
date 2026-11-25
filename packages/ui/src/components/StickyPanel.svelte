<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";

  let {
    children,
    className = "",
    maxH = 60,
    insetShadow = false,
    style = undefined,
    ...restProps
  } = $props();

  const numericMaxH = $derived(Number(maxH));
  const maxHeight = $derived(
    Number.isFinite(numericMaxH) && numericMaxH > 0 ? numericMaxH : 60,
  );

  const containerVariants = cva(
    "z-sticky bg-base-100 overflow-y-scroll sticky h-fit max-h-[var(--sticky-panel-max-h)]",
    {
      variants: {
        insetShadow: {
          true: "inset-shadow-sm",
        },
      },
    },
  );
</script>

<div
  class={cn(containerVariants({ insetShadow }), className)}
  style={`--sticky-panel-max-h: ${maxHeight}vh; ${style ?? ""}`}
  {...restProps}
>
  {@render children?.()}
</div>
