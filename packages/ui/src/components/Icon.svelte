<script>
  import { cx, cva } from "class-variance-authority";
  const {
    className,
    color,
    iconClass,
    responsive,
    scale = 1,
    ...restProps
  } = $props();
  const iconVariants = cva("icon", {
    variants: {
      color: {
        primary: ["text-primary border-primary"],
        secondary: ["text-secondary border-secondary"],
        accent: ["text-accent border-accent"],
        neutral: ["text-neutral border-neutral"],
        info: ["text-info border-info"],
        success: ["text-success border-success"],
        warning: ["text-warning border-warning"],
        error: ["text-error border-error"],
      },
      responsive: {
        true: [
          "text-xs",
          "sm:text-sm",
          "md:text-md",
          "lg:text-lg",
          "xl:text-xl",
          "2xl:text-2xl",
        ],
      },
    },
  });
</script>

<!-- icon url: https://icones.js.org/collection/material-symbols -->
<span
  style="transform:scale({scale})"
  {...restProps}
  class={cx(iconVariants({ color, responsive }), iconClass, className)}
></span>

<style>
</style>
