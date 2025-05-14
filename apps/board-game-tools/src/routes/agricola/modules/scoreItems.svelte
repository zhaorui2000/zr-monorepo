<script>
  const { children, max, compScore } = $props();
  import Range from "@zr/ui/Range";
  import ListItem from "@zr/ui/ListItem";
  import Badge from "@zr/ui/Badge";
  let value = $state(0);
  let score = $derived(compScore?.(value));
</script>

<ListItem
  >{@render children?.()}<Range min={0} {max} step={1} bind:value></Range>
  <div class="flex gap-1">
    <Badge>{value}</Badge><Badge color="success">{score}</Badge>
  </div></ListItem
>
