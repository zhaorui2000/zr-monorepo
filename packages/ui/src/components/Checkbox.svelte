<script>
  import { cva, cx } from "class-variance-authority";
  let {
    children,
    disabled,
    checked = $bindable(false),
    className,
    responsive = false,
    color = "",
    size = "",
    onChange,
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
      responsive: {
        true: [
          "checkbox-xs",
          "sm:checkbox-sm",
          "md:checkbox-md",
          "lg:checkbox-lg",
          "xl:checkbox-xl",
          "2xl:checkbox-xl",
        ],
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

<fieldset class={cx("fieldset", className)} style="font-size: inherit;">
  <label class={cx("fieldset-label")}>
    <input
      type="checkbox"
      {disabled}
      bind:checked
      class={cx(checkboxVariants({ color, size, responsive }))}
      {...restProps}
    />
    {@render children?.()}</label
  >
</fieldset>
