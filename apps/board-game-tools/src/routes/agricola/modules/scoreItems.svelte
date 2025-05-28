<script>
  const { children, max, compScore, onChangeScore } = $props();
  import Range from "@zr/ui/Range";
  import ListItem from "@zr/ui/ListItem";
  import Badge from "@zr/ui/Badge";
  import NumberBadge from "@zr/ui/NumberBadge";
  let value = $state(0);
  let score = $derived(compScore?.(value));
  const handleChange = (e) => {
    onChangeScore?.(Number(score));
  };
</script>

<ListItem class="grid mt-4" style="grid-template-columns: 3rem 1fr 5rem">
  <div>{@render children?.()}</div>
  <Range
    color="primary"
    min={0}
    {max}
    step={1}
    bind:value
    onchange={handleChange}
  ></Range>
  <div class="flex flex-col items-center gap-2">
    <Badge>{value}</Badge>
    <NumberBadge value={score}></NumberBadge>
  </div></ListItem
>
