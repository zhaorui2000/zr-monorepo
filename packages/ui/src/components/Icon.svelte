<script>
  import { cx } from "class-variance-authority";
  const { className, iconClass, ...restProps } = $props();
</script>

<!-- icon url: https://icones.js.org/collection/material-symbols -->

<span {...restProps} class={cx(iconClass, className)}></span>
