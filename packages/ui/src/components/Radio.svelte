<script>
  import { cva, cx } from "class-variance-authority";
  import longPress from "@zr/svelte-actions/longPress";
  let {
    color = "",
    size = "",
    bg = "",
    name,
    className,
    children,
    ...restProps
  } = $props();
  let isShowRadio = $state(true);

  const radioVariants = cva("radio", {
    variants: {
      bg: {
        neutral: ["bg-neutral"],
        primary: ["bg-primary"],
        secondary: ["bg-secondary"],
        accent: ["bg-accent"],
        info: ["bg-info"],
        success: ["bg-success"],
        warning: ["bg-warning"],
        error: ["bg-error"],
      },
      color: {
        neutral: ["radio-neutral"],
        primary: ["radio-primary"],
        secondary: ["radio-secondary"],
        accent: ["radio-accent"],
        info: ["radio-info"],
        success: ["radio-success"],
        warning: ["radio-warning"],
        error: ["radio-error"],
      },
      size: {
        xs: ["radio-xs"],
        sm: ["radio-sm"],
        md: ["radio-md"],
        lg: ["radio-lg"],
        xl: ["radio-xl"],
      },
    },
    defaultVariants: {},
  });
</script>

<fieldset
  class={cx("fieldset", className)}
  use:longPress={{
    longPress: (e) => {
      isShowRadio = !isShowRadio;
    },
    eventListenerOptions: {
      capture: true,
    },
  }}
>
  <label class="flex gap-2 cursor-pointer items-center">
    <input
      type="radio"
      {name}
      class={cx(radioVariants({ color, size, bg }), {
        "opacity-0": !isShowRadio,
      })}
      {...restProps}
    />
    <span
      class={cx("select-none", {
        "line-through": !isShowRadio,
      })}>{@render children?.()}</span
    >
  </label>
</fieldset>
