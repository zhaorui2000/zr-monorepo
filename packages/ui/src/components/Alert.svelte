<script>
  import Icon from "./Icon.svelte";
  import { cva } from "class-variance-authority";
  import { fade } from "svelte/transition";
  import countDown from "@zr/svelte-actions/countDown";
  import { cn } from "./common/cn.js";
  import { colorVariants, responsiveVariants } from "./common/variants.js";

  export const ALERT_ICON_TYPE = {
    neutral: "icon-[material-symbols--info-outline-rounded]",
    info: "icon-[material-symbols--info-outline-rounded]",
    success: "icon-[material-symbols--check-circle-rounded]",
    warning: "icon-[material-symbols--warning-outline-rounded]",
    error: "icon-[material-symbols--error-outline-rounded]",
  };

  const {
    type,
    className = "",
    color,
    duration = 0,
    isShowRemaining = false,
    soft,
    outline,
    dash,
    vertical,
    closeable = true,
    closable = undefined,
    horizontal,
    responsive,
    children = undefined,
    ...restProps
  } = $props();

  let isShow = $state(true);
  let remaining = $state(0);
  /** @type {any} */
  let countdownController = null;
  const canClose = $derived(closable ?? closeable);
  const alertIcon = $derived(
    /** @type {Record<string, string>} */ (ALERT_ICON_TYPE)[
      /** @type {string} */ (type ?? "")
    ] ?? "",
  );
  const countDownOptions = $derived(
    /** @type {any} */ ({
      setController(/** @type {any} */ value) {
        countdownController = value;
      },
      duration,
      onTick(/** @type {number} */ value) {
        remaining = Number((value / 1000).toFixed(0));
      },
      onCountdownEnd() {
        isShow = false;
      },
    }),
  );

  $effect(() => {
    remaining = Number(duration);
  });

  const alertVariants = cva("alert", {
    variants: {
      color: colorVariants.alert,
      soft: {
        true: "alert-soft",
      },
      outline: {
        true: "alert-outline",
      },
      dash: {
        true: "alert-dash",
      },
      vertical: {
        true: "alert-vertical",
      },
      horizontal: {
        true: "alert-horizontal",
      },
      responsive: {
        true: responsiveVariants.alert,
      },
    },
  });
</script>

{#if isShow}
  <div
    onmouseenter={() => countdownController?.pause()}
    onmouseleave={() => countdownController?.restart()}
    onfocusin={() => countdownController?.pause()}
    onfocusout={() => countdownController?.restart()}
    transition:fade={{ duration: 300 }}
    use:countDown={countDownOptions}
    role="alert"
    class={cn(
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
    {#if alertIcon}
      <Icon iconClass={alertIcon} />
    {/if}
    <div class={className}>
      {@render children?.()}
    </div>
    {#if isShowRemaining}
      <span>{remaining}s</span>
    {/if}
    {#if canClose}
      <button
        type="button"
        class="btn btn-ghost btn-xs btn-circle shrink-0"
        aria-label="关闭提示"
        onclick={() => {
          isShow = false;
        }}
      >
        <Icon iconClass="icon-[material-symbols--close-rounded]" />
      </button>
    {/if}
  </div>
{/if}
