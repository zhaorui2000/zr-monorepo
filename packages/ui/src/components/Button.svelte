<script>
  import { cva, cx } from "class-variance-authority";

  let {
    color = "",
    size = "",
    loading = false,
    soft = false,
    dashed = false,
    content,
    className,
  } = $props();

  const buttonVariants = cva("btn", {
    variants: {
      color: {
        neutral: ["btn-neutral"],
        primary: ["btn-primary"],
        secondary: ["btn-secondary"],
        accent: ["btn-accent"],
        info: ["btn-info"],
        success: ["btn-success"],
        warning: ["btn-warning"],
        error: ["btn-error"],
      },
      soft: {
        true: ["btn-soft"],
      },
      dashed: {
        true: ["btn-dashed"],
      },
      active: {
        true: ["btn-active"],
      },
      ghost: {
        true: ["btn-ghost"],
      },
      wide: {
        true: ["btn-wide"],
      },
      disabled: {
        true: ["btn-disabled"],
      },
      square: {
        true: ["btn-square"],
      },
      block: {
        true: ["btn-block"],
      },
      size: {
        "": "",
        sm: ["btn-sm"],
        md: ["btn-md"],
        lg: ["btn-lg"],
        xl: ["btn-xl"],
        "2xl": ["btn-2xl"],
      },
    },
    defaultVariants: {},
  });
</script>

<button class={cx(buttonVariants({ color, size }), className)}>
  {#if loading}
    <span class="loading loading-spinner"></span>
  {/if}
  {@render content?.()}
</button>
