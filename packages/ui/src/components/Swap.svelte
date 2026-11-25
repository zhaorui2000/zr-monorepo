<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";

  let {
    on,
    off,
    onChange,
    className = "",
    checked = $bindable(false),
    disabled = false,
    name,
    value,
    "aria-label": ariaLabel,
    ...restProps
  } = $props();

  const swapVariants = cva("swap");
</script>

<label class={cn(swapVariants(), className)} {...restProps}>
  <input
    type="checkbox"
    {checked}
    {disabled}
    {name}
    {value}
    aria-label={ariaLabel}
    onchange={onChange}
  />
  <div class="swap-on">{@render on?.()}</div>
  <div class="swap-off">{@render off?.()}</div>
</label>
