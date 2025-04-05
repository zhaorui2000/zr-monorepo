<script>
  import Icon from "./Icon.svelte";
  import { cx, cva } from "class-variance-authority";
  import { fade } from "svelte/transition";
  export const ALERT_ICON_TYPE = {
    success: "icon-[material-symbols--check-circle-rounded]",
    error: "icon-[material-symbols--error-outline-rounded]",
  };
  const {
    type,
    className,
    color,
    soft,
    outline,
    dash,
    vertical,
    closeable = true,
    horizontal,
    responsive,
    children,
    ...restProps
  } = $props();
  let isShow = $state(true);
  const alertVariants = cva("alert", {
    variants: {
      color: {
        undefined: [""],
        neutral: ["alert-neutral"],
        primary: ["alert-primary"],
        secondary: ["alert-secondary"],
        accent: ["alert-accent"],
        info: ["alert-info"],
        success: ["alert-success"],
        warning: ["alert-warning"],
        error: ["alert-error"],
      },
      soft: {
        true: ["alert-soft"],
      },
      outline: {
        true: ["alert-outline"],
      },
      dash: {
        true: ["alert-dash"],
      },
      vertical: {
        true: ["alert-vertical"],
      },
      horizontal: {
        true: ["alert-horizontal"],
      },
      responsive: {
        true: [
          "text-xs",
          "sm:text-sm",
          "md:text-base",
          "lg:text-lg",
          "xl:text-xl",
          "2xl:text-xl",
        ],
      },
    },
    compoundVariants: [],
    defaultVariants: {},
  });
</script>

{#if isShow}
  <div
    transition:fade={{ duration: 300 }}
    role="alert"
    class={cx(
      alertVariants({
        responsive,
        color,
        soft,
        outline,
        dash,
        vertical,
        horizontal,
      }),
      className
    )}
    {...restProps}
  >
    <Icon iconClass={ALERT_ICON_TYPE[type]}></Icon>
    {@render children?.()}
    {#if closeable}
      <Icon
        iconClass="icon-[material-symbols--close-rounded]"
        className="cursor-pointer"
        onclick={() => {
          isShow = false;
        }}
      ></Icon>
    {/if}
  </div>
{/if}
