<script>
  import { cva, cx } from "class-variance-authority";
  import Icon from "./Icon.svelte";
  import Button from "./Button.svelte";
  import { fade } from "svelte/transition";
  let {
    color,
    size,
    dash = false,
    border = false,
    title = "",
    actions,
    collapsedActions,
    className,
    stickyAble = false,
    stickyClass = "top-0 bottom-0",
    responsive = false,
    children,
    style,
  } = $props();
  let sticky = $state(false);
  let showCollapsedActions = $state(false);
  const cardVariants = cva("card overflow-y-scroll", {
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
  {style}
  class={cx(
    cardVariants({ color, size, responsive, border, dash, sticky }),
    {
      [stickyClass]: sticky,
      "rounded-none": sticky,
    },
    { "pb-5": actions },
    className,
  )}
>
  <div class="card-body">
    {#if stickyAble}
      <Button
        className="text-2xl absolute top-2 right-2 z-1 opacity-25"
        {color}
        responsive
        circle
        ghost
        onclick={() => {
          sticky = !sticky;
        }}
      >
        <Icon
          iconClass={cx({
            "icon-[material-symbols--sticky-note-rounded]": sticky,
            "icon-[material-symbols--sticky-note-outline-rounded]": !sticky,
          })}
        ></Icon>
      </Button>
    {/if}
    <h3
      class={cx(cardTitleVariants({ color }))}
      style="top: calc(-1 * var(--card-p, 1.5rem) + .25rem)"
    >
      {title}
    </h3>
      {@render children?.()}
    <div
      class="card-actions justify-end items-center gap-2 flex-nowrap absolute right-1 bottom-1"
    >
      {@render actions?.()}
      {#if showCollapsedActions}
        <div
          class="flex justify-end items-center gap-2"
          transition:fade={{ duration: 300 }}
        >
          {@render collapsedActions?.()}
        </div>
      {/if}
      {#if collapsedActions}
        <Button
          onclick={() => (showCollapsedActions = !showCollapsedActions)}
          circle
          responsive
          className={cx("", {
            "opacity-25": !showCollapsedActions,
            "opacity-75": showCollapsedActions,
          })}
        >
          <Icon responsive iconClass="icon-[material-symbols--more-horiz]"
          ></Icon>
        </Button>
      {/if}
    </div>
  </div>
</div>
