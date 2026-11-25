<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";
  import { colorVariants, sizeVariants } from "./common/variants.js";

  let {
    placeholder = "",
    legend = "",
    label = "",
    disabled = false,
    color = "",
    size = "",
    ghost = false,
    value = $bindable(""),
    className = "",
    ...restProps
  } = $props();

  const textAreaVariants = cva("textarea", {
    variants: {
      ghost: {
        true: "textarea-ghost",
      },
      color: colorVariants.textarea,
      size: sizeVariants.textarea,
    },
  });
</script>

<fieldset class={cn("fieldset", className)}>
  {#if legend}
    <legend class="fieldset-legend">{legend}</legend>
  {/if}
  <textarea
    {disabled}
    {placeholder}
    class={cn(textAreaVariants({ color, size, ghost }), "w-full")}
    {value}
    {...restProps}></textarea>
  {#if label}
    <div class="fieldset-label">{label}</div>
  {/if}
</fieldset>
