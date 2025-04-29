<script>
  let { children, ...restProps } = $props();
</script>

<li class="list-row" {...restProps}>
  {@render children?.()}
</li>
