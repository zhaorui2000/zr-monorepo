<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";
  import {
    colorVariants,
    responsiveVariants,
    sizeVariants,
  } from "./common/variants.js";

  let {
    color = "",
    size = "",
    disabled = false,
    loading = false,
    soft = false,
    dash = false,
    circle = false,
    outline = false,
    block = false,
    active = false,
    wide = false,
    content = undefined,
    className = "",
    ghost = false,
    square = false,
    responsive = false,
    children = undefined,
    ...restProps
  } = $props();

  const buttonVariants = cva("btn", {
    variants: {
      color: colorVariants.button,
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
      responsive: {
        true: responsiveVariants.button,
      },
      size: sizeVariants.button,
    },
    defaultVariants: {},
  });
</script>

<button
  class={cn(
    buttonVariants({
      responsive,
      color,
      size,
      disabled,
      active,
      wide,
      square,
      dash,
      ghost,
      soft,
      outline,
      circle,
      block,
    }),
    className,
  )}
  disabled={disabled || loading}
  aria-busy={loading}
  {...restProps}
>
  {#if loading}
    <span class="loading loading-spinner"></span>
  {/if}
  {#if !loading}
    {@render children?.()}
  {/if}
</button>
