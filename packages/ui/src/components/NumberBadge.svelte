<script>
  import Badge from "./Badge.svelte";
  const { value, ...restProps } = $props();
  delete restProps.color;
  const color = $derived(value > 0 ? "success" : value < 0 ? "error" : "");
</script>

<Badge {color} {...restProps}>{value}</Badge>
