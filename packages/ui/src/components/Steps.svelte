<script>
  import { cva, cx } from "class-variance-authority";
  const stepVariants = cva("steps", {
    variants: {
      direction: {
        horizontal: ["steps-horizontal"],
        vertical: ["steps-vertical"],
      },
    },
  });
  const stepItemVariants = cva("", {
    variants: {
      color: {
        undefined: [""],
        primary: ["step-primary"],
        secondary: ["step-secondary"],
        accent: ["step-accent"],
        neutral: ["step-neutral"],
        info: ["step-info"],
        success: ["step-success"],
        warning: ["step-warning"],
        error: ["step-error"],
      },
    },
  });
  let {
    direction = "horizontal",
    items,
    currentStep = $bindable(),
    children,
    color,
  } = $props();
</script>

<ul class={stepVariants({ direction })}>
  {#each items as { className }, i}
    <li
      class={cx(
        "step",
        {
          [stepItemVariants({ color })]: i <= currentStep,
        },
        className
      )}
    >
      {@render children?.(i)}
    </li>
  {/each}
</ul>
