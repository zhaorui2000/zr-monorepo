<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";

  const {
    title = undefined,
    children,
    className = "",
    ...restProps
  } = $props();
  const listVariants = cva("list bg-base-100 rounded-box shadow-md");
</script>

<ul class={cn(listVariants(), className)} {...restProps}>
  {#if title}
    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
      {@render title?.()}
    </li>
  {/if}
  {@render children?.()}
</ul>
