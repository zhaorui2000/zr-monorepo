<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";
  import { colorVariants } from "./common/variants.js";

  let {
    color = /** @type {string} */ ("base"),
    border = false,
    icon = undefined,
    title = "",
    className = "",
    children = undefined,
    ...restProps
  } = $props();

  const collapseVariants = cva("collapse", {
    variants: {
      color: {
        base: "bg-base-100",
        none: "",
        ...colorVariants.surface,
      },
      border: {
        true: "border border-base-300",
      },
      icon: {
        undefined: "",
        arrow: "collapse-arrow",
        plus: "collapse-plus",
      },
    },
  });
</script>

<div
  tabindex="0"
  class={cn(collapseVariants({ color, border, icon }), className)}
  {...restProps}
>
  <div class="collapse-title font-semibold">{title}</div>
  <div class="collapse-content">
    {@render children?.()}
  </div>
</div>
