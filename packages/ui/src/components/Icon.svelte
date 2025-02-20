<script>
  import { cx } from "class-variance-authority";
  const { className, iconName, ...restProps } = $props();
</script>

<!-- icon url: https://icones.js.org/collection/material-symbols -->

<span
  {...restProps}
  class={cx(`icon-[material-symbols--${iconName}]`, className)}
></span>
