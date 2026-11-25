<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";
  import { colorVariants } from "./common/variants.js";

  const dividerVariants = cva("divider", {
    variants: {
      color: colorVariants.divider,
    },
  });

  let { color, className = "", ...restProps } = $props();
</script>

<div
  role="separator"
  class={cn(dividerVariants({ color }), className)}
  {...restProps}
></div>
