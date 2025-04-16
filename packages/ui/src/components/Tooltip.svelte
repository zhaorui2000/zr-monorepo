<script>
  import { cva, cx } from "class-variance-authority";
  const {
    className,
    children,
    content,
    color,
    position,
    open = false,
    ...restProps
  } = $props();
  const tooltipClass = cva("tooltip", {
    variants: {
      color: {
        primary: ["tooltip-primary"],
        secondary: ["tooltip-secondary"],
        accent: ["tooltip-accent"],
        neutral: ["tooltip-neutral"],
        info: ["tooltip-info"],
        success: ["tooltip-success"],
        warning: ["tooltip-warning"],
        error: ["tooltip-error"],
      },
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
  class={cx(tooltipClass({ open, color, position }), className)}
  {...restProps}
>
  <div class="tooltip-content">
    {@render content?.()}
  </div>
  {@render children?.()}
</div>
