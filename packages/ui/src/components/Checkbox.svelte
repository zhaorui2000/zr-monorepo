<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";
  import {
    colorVariants,
    responsiveVariants,
    sizeVariants,
  } from "./common/variants.js";

  let {
    children,
    disabled = false,
    checked = $bindable(false),
    className = "",
    responsive = false,
    color = "",
    size = "",
    ...restProps
  } = $props();

  const checkboxVariants = cva("checkbox", {
    variants: {
      color: colorVariants.checkbox,
      responsive: {
        true: responsiveVariants.checkbox,
      },
      size: sizeVariants.checkbox,
    },
  });
</script>

<fieldset class={cn("fieldset", className)} style="font-size: inherit;">
  <label class="fieldset-label">
    <input
      type="checkbox"
      {disabled}
      bind:checked
      class={cn(checkboxVariants({ color, size, responsive }))}
      {...restProps}
    />
    {@render children?.()}
  </label>
</fieldset>
