<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";
  import { colorVariants, sizeVariants } from "./common/variants.js";

  let {
    step = 1,
    initValue = 0,
    max = 100,
    min = 0,
    className = "",
    color,
    size,
    value = $bindable(initValue),
    ...restProps
  } = $props();

  const textClass = cva("", {
    variants: {
      color: colorVariants.text,
    },
  });

  const rangeClass = cva("range w-full", {
    variants: {
      color: colorVariants.range,
      size: sizeVariants.range,
    },
  });

  const ticks = $derived.by(() => {
    const numericMin = Number(min);
    const numericMax = Number(max);
    const numericStep = Number(step);

    if (
      !Number.isFinite(numericMin) ||
      !Number.isFinite(numericMax) ||
      !Number.isFinite(numericStep) ||
      numericStep <= 0 ||
      numericMax < numericMin
    ) {
      return [];
    }

    const count = Math.floor((numericMax - numericMin) / numericStep) + 1;
    return Array.from({ length: count }, (_, index) =>
      Math.min(numericMax, numericMin + index * numericStep),
    );
  });
</script>

<div class={cn("w-full", textClass({ color }))}>
  <input
    bind:value
    {...restProps}
    type="range"
    {min}
    {max}
    {step}
    class={cn(rangeClass({ color, size }), className)}
  />
  <div class="flex justify-between px-2.5 mt-2 text-xs">
    {#each ticks as tick}
      <span>|</span>
    {/each}
  </div>
  <div class="flex justify-between px-2.5 mt-2 text-xs">
    {#each ticks as tick}
      <span>{tick}</span>
    {/each}
  </div>
</div>
