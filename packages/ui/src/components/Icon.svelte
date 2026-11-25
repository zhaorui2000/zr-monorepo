<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";
  import { colorVariants, responsiveVariants } from "./common/variants.js";
  const {
    className = "",
    color = undefined,
    iconClass = "",
    responsive = false,
    scale = 1,
    ...restProps
  } = $props();
  const iconVariants = cva("icon", {
    variants: {
      color: colorVariants.icon,
      responsive: {
        true: responsiveVariants.icon,
      },
    },
  });
</script>

<!-- icon url: https://icones.js.org/collection/material-symbols -->
<span
  style="transform:scale({scale})"
  {...restProps}
  class={cn(iconVariants({ color, responsive }), iconClass, className)}
></span>
