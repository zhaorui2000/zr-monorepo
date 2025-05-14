<script>
  import { cva, cx } from "class-variance-authority";
  let {
    step,
    initValue,
    max,
    min,
    className,
    color,
    size,
    value = $bindable(initValue),
    ...restProps
  } = $props();
  const rangeClass = cva("range w-full", {
    variants: {
      color: {
        undefined: [""],
        primary: ["range-primary"],
        secondary: ["range-secondary"],
        accent: ["range-accent"],
        neutral: ["range-neutral"],
        info: ["range-info"],
        success: ["range-success"],
        warning: ["range-warning"],
        error: ["range-error"],
      },
      size: {
        xs: ["range-xs"],
        sm: ["range-sm"],
        md: ["range-md"],
        lg: ["range-lg"],
        xl: ["range-xl"],
      },
    },
  });
</script>

<div class="w-full">
  <input
    bind:value
    {...restProps}
    type="range"
    {min}
    {max}
    {step}
    class={cx(rangeClass({ color, size }), className)}
  />
  <div class="flex justify-between px-2.5 mt-2 text-xs">
    {#each { length: Math.ceil((max - min) / step) + 1 }}
      <span>|</span>
    {/each}
  </div>
  <div class="flex justify-between px-2.5 mt-2 text-xs">
    {#each { length: Math.ceil((max - min) / step) + 1 }, value}
      <span>{min + value * step}</span>
    {/each}
  </div>
</div>
