<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";
  import {
    colorVariants,
    responsiveVariants,
    sizeVariants,
  } from "./common/variants.js";
  let {
    color = "",
    size = "",
    soft = false,
    outline = false,
    dash = false,
    ghost = false,
    responsive = false,
    className = "",
    children = undefined,
    ...restProps
  } = $props();
  const badgeVariants = cva("badge whitespace-nowrap", {
    variants: {
      responsive: {
        true: responsiveVariants.badge,
      },
      size: sizeVariants.badge,
      color: colorVariants.badge,
      soft: {
        true: ["badge-soft"],
      },
      outline: {
        true: ["badge-outline"],
      },
      dash: {
        true: ["badge-dash"],
      },
      ghost: {
        true: ["badge-ghost"],
      },
    },
  });
</script>

<span
  class={cn(
    badgeVariants({ color, size, soft, outline, dash, ghost, responsive }),
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</span>
