<script>
  import Badge from "./Badge.svelte";
  const { value, color: _ignoredColor, ...restProps } = $props();
  const color = $derived(value > 0 ? "success" : value < 0 ? "error" : "");
</script>

<Badge {color} {...restProps}>{value}</Badge>
