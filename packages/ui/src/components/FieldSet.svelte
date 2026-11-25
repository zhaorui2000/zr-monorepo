<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";

  let { legend = undefined, children, className = "", ...restProps } = $props();
  const fieldSetVariants = cva("fieldset");
</script>

<fieldset class={cn(fieldSetVariants(), className)} {...restProps}>
  {#if legend}
    <legend class="fieldset-legend">{@render legend?.()}</legend>
  {/if}
  {@render children?.({ labelClass: "label" })}
</fieldset>
