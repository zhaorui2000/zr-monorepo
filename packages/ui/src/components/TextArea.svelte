<script>

  import { cva,cx } from "class-variance-authority";
  let {
    placeholder = "",
    legend = "",
    label = "",
    disabled = false,
    color = "",
    size = "",
    ghost = false,
    className,
  } = $props();
  const textAreaVariants = cva("textarea", {
    variants: {
      ghost: {
        true: ["textarea-ghost"],
      },
      color: {
        primary: ["textarea-primary"],
        secondary: ["textarea-secondary"],
        accent: ["textarea-accent"],
        neutral: ["textarea-neutral"],
        info: ["textarea-info"],
        success: ["textarea-success"],
        warning: ["textarea-warning"],
        error: ["textarea-error"],
      },
      size: {
        xs: ["textarea-xs"],
        sm: ["textarea-sm"],
        md: ["textarea-md"],
        lg: ["textarea-lg"],
        xl: ["textarea-xl"],
      },
    },
  });
</script>

<fieldset class={cx("fieldset",className)}>
  {#if legend}
    <legend class="fieldset-legend">{legend}</legend>
  {/if}
  <textarea
    {disabled}
    {placeholder}
    class={cx(textAreaVariants({ color, size, ghost }),"w-full")}
  >
  </textarea>
  {#if label}
    <div class="fieldset-label">{label}</div>
  {/if}
</fieldset>
