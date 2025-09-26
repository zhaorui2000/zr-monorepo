<script>
  import Model from "@zr/ui/Model";
  import Badge from "@zr/ui/Badge";
  import Alert from "@zr/ui/Alert";
  let { validCombosForMagic, magicName, isShow, onchange } = $props();
</script>

<Model className="h-[40dvh]" {isShow} {onchange}>
  {#snippet title()}{magicName}{/snippet}
  <div class="space-y-2 p-2">
    {#each validCombosForMagic.get(magicName) as { comboNames }, index}
      <Alert className="flex gap-x-4" closable>
        <Badge color="primary">{index + 1}</Badge>
        <div class="flex gap-1 flex-wrap">
          {#each comboNames as name}
            <Badge>{name}</Badge>
          {/each}
        </div>
      </Alert>
    {/each}
  </div></Model
>
