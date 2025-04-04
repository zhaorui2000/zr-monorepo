<script>
  import { cva, cx } from "class-variance-authority";

  let {
    color = "",
    size = "",
    disabled = false,
    loading = false,
    soft = false,
    dash = false,
    circle = false,
    outline = false,
    content,
    className,
    ghost = false,
    square = false,
    children,
    ...restProps
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
      dash: {
        true: ["btn-dash"],
      },
      outline: {
        true: ["btn-outline"],
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
      circle: {
        true: ["btn-circle"],
      },
      block: {
        true: ["btn-block"],
      },
      size: {
        "": "",
        xs: ["btn-xs"],
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

<button
  class={cx(
    buttonVariants({
      color,
      size,
      disabled,
      square,
      dash,
      ghost,
      soft,
      outline,
      circle,
    }),
    className
  )}
  {...restProps}
>
  {#if loading}
    <span class="loading loading-spinner"></span>
  {/if}
  {#if !loading}
    {@render children?.()}
  {/if}
</button>
