<script>
  import { cx, cva } from "class-variance-authority";
  const navbarVariants = cva("navbar bg-base-100 shadow-sm", {
    variants: {
      color: {
        primary: ["bg-primary", "text-primary-content"],
        secondary: "bg-secondary text-secondary-content",
        accent: "bg-accent text-accent-content",
        neutral: "bg-neutral text-neutral-content",
        info: "bg-info text-info-content",
        success: "bg-success text-success-content",
        warning: "bg-warning text-warning-content",
        error: "bg-error text-error-content",
      },
    },
  });
  let { start, end, color, children } = $props();
</script>

<div class={cx(navbarVariants({ color }))}>
  <div class="navbar-start">
    {@render start?.()}
  </div>
  <div class="navbar-center">
    <a href="" class="btn btn-ghost text-xl">{@render children?.()}</a>
  </div>
  <div class="navbar-end">
    {@render end?.()}
  </div>
</div>
