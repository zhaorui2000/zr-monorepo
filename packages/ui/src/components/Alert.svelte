<script>
  import Icon from "./Icon.svelte";
  import { cx, cva } from "class-variance-authority";
  import { fade } from "svelte/transition";
  import countDown from "@zr/svelte-actions/countDown";

  export const ALERT_ICON_TYPE = {
    success: "icon-[material-symbols--check-circle-rounded]",
    error: "icon-[material-symbols--error-outline-rounded]",
  };
  const {
    type,
    className,
    color,
    duration = 0,
    isShowRemaining = false,
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
  let remaining = $state(Number(duration));
  let countdownController = null;

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
    onmousemove={() => countdownController?.pause()}
    onmouseleave={() => countdownController?.restart()}
    transition:fade={{ duration: 300 }}
    use:countDown={{
      setController(value) {
        countdownController = value;
      },
      duration,
      onTick(value) {
        remaining = Number((value / 1000).toFixed(0));
      },
      onCountdownEnd() {
        isShow = false;
      },
    }}
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
    )}
    {...restProps}
  >
    <Icon iconClass={ALERT_ICON_TYPE[type]}></Icon>
    <div class={className}>
      {@render children?.()}
    </div>
    {#if isShowRemaining}
      <span>{remaining}s</span>
    {/if}
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
