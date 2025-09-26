<script>
  import { cva, cx } from "class-variance-authority";
  let { legend, children, className } = $props();
  const fieldSetVariants = cva("fieldset", {
    variants: {},
  });
</script>

<fieldset class={cx(fieldSetVariants(), className)}>
  {#if legend}
    <legend class="fieldset-legend">{@render legend?.()}</legend>
  {/if}
  {@render children?.({ labelClass: "label" })}
</fieldset>
