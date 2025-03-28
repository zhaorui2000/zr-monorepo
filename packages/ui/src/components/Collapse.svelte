<script>
  import { cva, cx } from "class-variance-authority";
  let { color, border, icon, title, className, children } = $props();
  const collapseVariants = cva("collapse", {
    variants: {
      color: {
        undefined: ["bg-base-100"],
        none: [""],
        neutral: ["bg-neutral text-neutral-content"],
        primary: ["bg-primary text-primary-content"],
        secondary: ["bg-secondary text-secondary-content"],
        accent: ["bg-accent text-accent-content"],
        info: ["bg-info text-info-content"],
        success: ["bg-success text-success-content"],
        warning: ["bg-warning text-warning-content"],
        error: ["bg-error text-error-content"],
      },
      border: {
        true: ["border", "border-base-300"],
      },
      icon: {
        undefined: [""],
        arrow: ["collapse-arrow"],
        plus: ["collapse-plus"],
      },
    },
    compoundVariants: [],
    defaultVariants: {},
  });
</script>

<div
  tabindex="0"
  class={cx(collapseVariants({ color, border, icon }), className)}
>
  <div class="collapse-title font-semibold">{title}</div>
  <div class="collapse-content text-sm">
    {@render children?.()}
  </div>
</div>
