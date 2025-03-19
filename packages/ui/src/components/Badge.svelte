<script>
  import { cva, cx } from "class-variance-authority";
  let {
    color = "",
    size = "",
    soft = false,
    outline = false,
    dash = false,
    ghost = false,
    className,
    children,
  } = $props();
  const badgeVariants = cva("badge", {
    variants: {
      size: {
        xs: ["badge-xs"],
        sm: ["badge-sm"],
        md: ["badge-md"],
        lg: ["badge-lg"],
        xl: ["badge-xl"],
      },
      color: {
        primary: ["badge-primary"],
        secondary: ["badge-secondary"],
        accent: ["badge-accent"],
        neutral: ["badge-neutral"],
        info: ["badge-info"],
        success: ["badge-success"],
        warning: ["badge-warning"],
        error: ["badge-error"],
      },
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
  class={cx(
    badgeVariants({ color, size, soft, outline, dash, ghost }),
    className
  )}>{@render children?.()}</span
>
