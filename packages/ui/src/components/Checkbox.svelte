<script>
  import { cva, cx } from "class-variance-authority";
  let {
    children,
    disabled,
    checked,
    className,
    color = "",
    size = "",
    ...restProps
  } = $props();
  const checkboxVariants = cva("checkbox", {
    variants: {
      color: {
        primary: ["checkbox-primary"],
        secondary: ["checkbox-secondary"],
        accent: ["checkbox-accent"],
        neutral: ["checkbox-neutral"],
        info: ["checkbox-info"],
        success: ["checkbox-success"],
        warning: ["checkbox-warning"],
        error: ["checkbox-error"],
      },
      size: {
        xs: ["checkbox-xs"],
        sm: ["checkbox-sm"],
        md: ["checkbox-md"],
        lg: ["checkbox-lg"],
        xl: ["checkbox-xl"],
      },
    },
  });
</script>

<label class={cx("fieldset-label", className)}>
  <input
    type="checkbox"
    {disabled}
    bind:checked
    class={cx(checkboxVariants({ color, size }))}
    {...restProps}
  />
  {@render children?.()}</label
>
