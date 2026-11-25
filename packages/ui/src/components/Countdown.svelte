<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";
  import { colorVariants } from "./common/variants.js";

  const {
    value,
    digits = 2,
    color = "",
    className = "",
    style = undefined,
    ...restProps
  } = $props();

  const numericValue = $derived(Number(value));
  const numericDigits = $derived(Number(digits));
  const countdownValue = $derived(
    Number.isFinite(numericValue) ? numericValue : 0,
  );
  const countdownDigits = $derived(
    Number.isFinite(numericDigits) && numericDigits >= 0
      ? Math.floor(numericDigits)
      : 2,
  );

  const countdownVariants = cva("countdown", {
    variants: {
      color: {
        default: "",
        ...colorVariants.surface,
      },
    },
  });
</script>

<span
  class={cn(
    countdownVariants({ color: /** @type {any} */ (color) }),
    className,
  )}
  style={`--value: ${countdownValue}; --digits: ${countdownDigits}; ${style ?? ""}`}
  {...restProps}
>
  <span aria-live="polite" aria-label={value}>${value}</span>
</span>
