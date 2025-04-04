<script>
  import { cx, cva } from "class-variance-authority";
  const { className, color, iconClass, ...restProps } = $props();
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
    },
  });
</script>

<!-- icon url: https://icones.js.org/collection/material-symbols -->

<span {...restProps} class={cx(iconVariants({ color }), iconClass, className)}
  >123</span
>
