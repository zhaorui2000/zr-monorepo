<script>
  import { cva } from "class-variance-authority";
  import longPress from "@zr/svelte-actions/longPress";
  import { cn } from "./common/cn.js";
  import {
    colorVariants,
    responsiveVariants,
    sizeVariants,
  } from "./common/variants.js";

  let {
    color = "",
    size = "",
    bg = "",
    responsive = false,
    name,
    className = "",
    checked = $bindable(false),
    children,
    ...restProps
  } = $props();

  let isShowRadio = $state(true);

  const radioVariants = cva("radio", {
    variants: {
      bg: colorVariants.background,
      color: colorVariants.radio,
      responsive: {
        true: responsiveVariants.radio,
      },
      size: sizeVariants.radio,
    },
  });
</script>

<fieldset
  class={cn(
    "fieldset",
    checked && colorVariants.text[color || "primary"],
    className,
  )}
  style="font-size: inherit;"
  use:longPress={{
    longPress: () => {
      isShowRadio = !isShowRadio;
    },
    eventListenerOptions: {
      capture: true,
    },
  }}
>
  <label class="flex gap-2 cursor-pointer items-center">
    <input
      {checked}
      type="radio"
      {name}
      class={cn(radioVariants({ responsive, color, size, bg }), {
        "opacity-0": !isShowRadio,
      })}
      {...restProps}
    />
    <span
      class={cn("select-none", {
        "line-through": !isShowRadio,
      })}
    >
      {@render children?.()}
    </span>
  </label>
</fieldset>
