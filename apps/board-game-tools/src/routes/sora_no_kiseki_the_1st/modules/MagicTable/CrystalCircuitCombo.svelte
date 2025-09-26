<script>
  import Model from "@zr/ui/Model";
  import Badge from "@zr/ui/Badge";
  import Alert from "@zr/ui/Alert";
  let { validCombosForMagic, magicName, isShow, onchange } = $props();
</script>

<Model className="h-[60dvh]" {isShow} {onchange}>
  {#snippet title()}{magicName}{/snippet}
  <div class="space-y-2 p-2">
    {#each validCombosForMagic.get(magicName) as { comboNames, size }, index}
      <Alert className="flex gap-x-4" closable>
        <div class="flex items-center gap-2">
          <Badge color="primary">{index + 1}</Badge>
          <Badge color="info">{size}槽</Badge>
        </div>
        <div class="flex gap-1 flex-wrap">
          {#each comboNames as name}
            <Badge>{name}</Badge>
          {/each}
        </div>
      </Alert>
    {/each}
  </div></Model
>
