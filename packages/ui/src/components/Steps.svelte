<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";
  import { colorVariants } from "./common/variants.js";

  const stepVariants = cva("steps", {
    variants: {
      direction: {
        horizontal: "steps-horizontal",
        vertical: "steps-vertical",
      },
    },
  });

  const stepItemVariants = cva("step", {
    variants: {
      color: colorVariants.step,
    },
  });

  let {
    direction = "horizontal",
    items,
    currentStep = $bindable(),
    children,
    color,
    className = "",
    ...restProps
  } = $props();
</script>

<ul class={cn(stepVariants({ direction }), className)} {...restProps}>
  {#each items as { className: itemClassName }, i}
    <li
      class={cn(
        stepItemVariants({ color: i <= currentStep ? color : undefined }),
        itemClassName,
      )}
      aria-current={i === currentStep ? "step" : undefined}
    >
      {@render children?.(i)}
    </li>
  {/each}
</ul>
