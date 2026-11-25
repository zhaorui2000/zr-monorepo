<script>
  import { cva } from "class-variance-authority";
  import Icon from "./Icon.svelte";
  import Button from "./Button.svelte";
  import { fade } from "svelte/transition";
  import { cn } from "./common/cn.js";
  import {
    colorVariants,
    responsiveVariants,
    sizeVariants,
  } from "./common/variants.js";
  let {
    color = "",
    size = "",
    dash = false,
    border = false,
    title = "",
    actions = undefined,
    collapsedActions = undefined,
    className = "",
    stickyAble = false,
    stickyClass = "top-0 bottom-0",
    responsive = false,
    children = undefined,
    style = undefined,
    ...restProps
  } = $props();
  let sticky = $state(false);
  let showCollapsedActions = $state(false);
  const cardVariants = cva("card overflow-y-scroll", {
    variants: {
      color: colorVariants.surface,
      size: sizeVariants.card,
      responsive: {
        true: responsiveVariants.card,
      },
      border: {
        true: ["card-border"],
      },
      dash: {
        true: ["card-dash"],
      },
      sticky: {
        true: ["sticky", "z-raised", "max-h-[40dvh]"],
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
      color: colorVariants.surface,
    },
    defaultVariants: {},
  });
</script>

<div
  {style}
  class={cn(
    cardVariants({ color, size, responsive, border, dash, sticky }),
    {
      [stickyClass]: sticky,
      "rounded-none": sticky,
    },
    className,
  )}
  {...restProps}
>
  <div class="card-body">
    {#if stickyAble}
      <Button
        className="text-2xl absolute top-2 right-2 z-raised opacity-25"
        {color}
        responsive
        circle
        ghost
        aria-label={sticky ? "取消固定卡片" : "固定卡片"}
        aria-pressed={sticky}
        onclick={() => {
          sticky = !sticky;
        }}
      >
        <Icon
          iconClass={cn({
            "icon-[material-symbols--sticky-note-rounded]": sticky,
            "icon-[material-symbols--sticky-note-outline-rounded]": !sticky,
          })}
        ></Icon>
      </Button>
    {/if}
    <h3
      class={cn(cardTitleVariants({ color }))}
      style="top: calc(-1 * var(--card-p, 1.5rem) + .25rem)"
    >
      {title}
    </h3>
    {@render children?.()}
    <div
      class="card-actions justify-end items-center flex-nowrap sticky"
      style="bottom:var(--card-p,1.5rem)"
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
          className={cn({
            "opacity-25": !showCollapsedActions,
            "opacity-75": showCollapsedActions,
          })}
          aria-label="更多操作"
          aria-expanded={showCollapsedActions}
        >
          <Icon responsive iconClass="icon-[material-symbols--more-horiz]"
          ></Icon>
        </Button>
      {/if}
    </div>
  </div>
</div>
