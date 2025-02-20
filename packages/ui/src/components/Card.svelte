<script>
  import { cva,cx } from "class-variance-authority";
  let {
    color,
    size,
    dashed = false,
    border = false,
    title = "",
    content,
    actions,
    className,
  } = $props();
  const cardVariants = cva("card", {
    variants: {
      color: {
        neutral: ["card-neutral text-neutral-content"],
        primary: ["card-primary text-primary-content"],
        secondary: ["card-secondary text-secondary-content"],
        accent: ["card-accent text-accent-content"],
        info: ["card-info text-info-content"],
        success: ["card-success text-success-content"],
        warning: ["card-warning text-warning-content"],
        error: ["card-error text-error-content"],
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
</script>

<div class={cx(cardVariants({ size, border, dashed, color }), className)}>
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>
      {@render content?.()}
    </p>
    <div class="card-actions justify-end">
      {@render actions?.()}
    </div>
  </div>
</div>
