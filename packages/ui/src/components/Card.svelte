<script>
  import { cva, cx } from "class-variance-authority";
  let {
    color,
    size,
    dashed = false,
    border = false,
    title = "",
    actions,
    className,
    children,
  } = $props();
  const cardVariants = cva("card relative", {
    variants: {
      color: {
        neutral: ["bg-neutral text-neutral-content"],
        primary: ["bg-primary text-primary-content"],
        secondary: ["bg-secondary text-secondary-content"],
        accent: ["bg-accent text-accent-content"],
        info: ["bg-info text-info-content"],
        success: ["bg-success text-success-content"],
        warning: ["bg-warning text-warning-content"],
        error: ["bg-error text-error-content"],
      },
      size: {
        xs: ["card-xs"],
        sm: ["card-sm"],
        md: ["card-md"],
        lg: ["card-lg"],
        xl: ["card-xl"],
      },
      border: {
        true: ["card-border"],
      },
      dashed: {
        true: ["card-dashed"],
      },
    },
    compoundVariants: [
      {
        border: false,
        dashed: false,
        className: "shadow-sm",
      },
    ],
    defaultVariants: {},
  });
  const cardTitleVariants = cva("card-title sticky top-0", {
    variants: {
      color: {
        neutral: ["bg-neutral", "text-neutral-content"],
        primary: ["bg-primary", "text-primary-content"],
        secondary: ["bg-secondary", "text-secondary-content"],
        accent: ["bg-accent", "text-accent-content"],
        info: ["bg-info", "text-info-content"],
        success: ["bg-success", "text-success-content"],
        warning: ["bg-warning", "text-warning-content"],
        error: ["bg-error", "text-error-content"],
      },
    },
    defaultVariants: {},
  });
</script>

<div class={cx(cardVariants({ size, border, dashed, color }), className)}>
  <div class="card-body">
    <h2 class={cx(cardTitleVariants({ color }))}>
      {title}
    </h2>
    <p>
      {@render children?.()}
    </p>
    <div class="card-actions justify-end">
      {@render actions?.()}
    </div>
  </div>
</div>
