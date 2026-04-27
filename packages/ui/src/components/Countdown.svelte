<script>
  import { v4 as uuidv4 } from "uuid";
  import { cva, cx } from "class-variance-authority";
  const { value, digits = 2, color = "default", className = "" } = $props();
  const id = uuidv4();
  $effect(() => {
    document.getElementById(id).style.setProperty("--value", value);
    document.getElementById(id).style.setProperty("--digits", `${digits}`);
  });
  const countdownVariants = cva("countdown", {
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
    },
  });
</script>

<span class={cx(countdownVariants({ color }), className)} {id}>
  <span aria-live="polite" aria-label={value}>${value}</span>
</span>
