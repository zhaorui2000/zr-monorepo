<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";
  import { colorVariants } from "./common/variants.js";
  const {
    className = "",
    children = undefined,
    content,
    color,
    position,
    open = false,
    ...restProps
  } = $props();
  const tooltipClass = cva("tooltip", {
    variants: {
      color: colorVariants.tooltip,
      position: {
        top: ["tooltip-top"],
        bottom: ["tooltip-bottom"],
        left: ["tooltip-left"],
        right: ["tooltip-right"],
      },
      open: {
        true: ["tooltip-open"],
      },
    },
  });
</script>

<div
  class={cn(tooltipClass({ open, color, position }), className)}
  {...restProps}
>
  <div class="tooltip-content">
    {@render content?.()}
  </div>
  {@render children?.()}
</div>
