<script>
  import { cva } from "class-variance-authority";
  import Button from "./Button.svelte";
  import { cn } from "./common/cn.js";
  import { colorVariants } from "./common/variants.js";

  const navbarVariants = cva("navbar shadow-sm", {
    variants: {
      color: {
        default: "bg-base-100",
        ...colorVariants.surface,
      },
    },
    defaultVariants: {
      color: "default",
    },
  });

  let {
    start,
    end,
    color = "default",
    onclickCenter,
    children,
    className = "",
    ...restProps
  } = $props();
</script>

<nav
  class={cn(navbarVariants({ color: /** @type {any} */ (color) }), className)}
  {...restProps}
>
  <div class="navbar-start">
    {@render start?.()}
  </div>
  {#if children || onclickCenter}
    <div class="navbar-center">
      <Button ghost className="text-xl" onclick={onclickCenter}>
        {@render children?.()}
      </Button>
    </div>
  {/if}
  <div class="navbar-end">
    {@render end?.()}
  </div>
</nav>
