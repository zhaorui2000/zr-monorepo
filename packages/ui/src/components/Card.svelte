<script>
  import { cva, cx } from "class-variance-authority";
  import Icon from "./Icon.svelte";
  import Joi from "joi";
  import sizeSchema from "./validateSchema/sizeSchema";
  import colorSchema from "./validateSchema/colorSchema";
  let {
    color,
    size,
    dash = false,
    border = false,
    title = "",
    actions,
    className,
    stickyAble = false,
    stickyClass = "top-0 bottom-0",
    responsive = false,
    children,
  } = $props();
  // ------------------------- 校验 -------------------------
  const { value: cardVariantsProps, error } = Joi.object({
    ...sizeSchema,
    ...colorSchema,
    dash: Joi.boolean(),
    border: Joi.boolean(),
  }).validate({
    responsive,
    size,
    border,
    dash,
    color,
  });
  $inspect(error);
  // ························· 校验 ·························
  let sticky = $state(false);
  const cardVariants = cva("card relative", {
    variants: {
      color: {
        neutral: ["bg-neutral text-neutral-content"],
        primary: ["bg-primary text-primary-content"],
        secondary: ["bg-secondary text-secondary-content"],
        accent: ["bg-accent text-accent-content"],
        info: ["bg-info text-info-content"],
        success: ["bg-success text-success-content"],
        warning: ["bg-warning text-warning-content"],
        error: ["bg-error text-error-content"],
      },
      size: {
        xs: ["card-xs"],
        sm: ["card-sm"],
        md: ["card-md"],
        lg: ["card-lg"],
        xl: ["card-xl"],
      },
      responsive: {
        true: [
          "card-xs",
          "sm:card-sm",
          "md:card-md",
          "lg:card-lg",
          "xl:card-xl",
          "2xl:card-xl",
        ],
      },
      border: {
        true: ["card-border"],
      },
      dash: {
        true: ["card-dash"],
      },
      sticky: {
        true: ["sticky", "z-2", "max-h-[40dvh]"],
      },
    },
    compoundVariants: [
      {
        border: false,
        dash: false,
        className: "shadow-sm",
      },
    ],
    defaultVariants: {},
  });
  const cardTitleVariants = cva("card-title sticky", {
    variants: {
      color: {
        neutral: ["bg-neutral", "text-neutral-content"],
        primary: ["bg-primary", "text-primary-content"],
        secondary: ["bg-secondary", "text-secondary-content"],
        accent: ["bg-accent", "text-accent-content"],
        info: ["bg-info", "text-info-content"],
        success: ["bg-success", "text-success-content"],
        warning: ["bg-warning", "text-warning-content"],
        error: ["bg-error", "text-error-content"],
      },
    },
    defaultVariants: {},
  });
</script>

<div
  class={cx(
    cardVariants({ ...cardVariantsProps, sticky }),
    { [stickyClass]: sticky, "rounded-none": sticky },
    className
  )}
>
  <div class="card-body overflow-y-scroll">
    {#if stickyAble}
      <Icon
        iconClass={cx({
          "icon-[material-symbols--sticky-note-rounded]": sticky,
          "icon-[material-symbols--sticky-note-outline-rounded]": !sticky,
        })}
        onclick={() => {
          sticky = !sticky;
        }}
        className="text-3xl absolute top-2 right-2 z-1 opacity-25"
      ></Icon>
    {/if}
    <h2
      class={cx(cardTitleVariants({ color }))}
      style="top: calc(-1 * var(--card-p, 1.5rem))"
    >
      {title}
    </h2>
    <p>
      {@render children?.()}
    </p>
    <div class="card-actions justify-end">
      {@render actions?.()}
    </div>
  </div>
</div>
