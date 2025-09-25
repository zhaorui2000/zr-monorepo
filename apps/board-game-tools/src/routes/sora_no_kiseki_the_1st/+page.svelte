<script>
  
  import Container from "@zr/ui/Container";
  import StickyPanel from "@zr/ui/StickyPanel"
  import CrystalCircuitTable from "./modules/crystalCircuitTable.svelte";
</script>

<Container position="bottom">
  {#snippet children({ stickyClass })}
  <CrystalCircuitTable></CrystalCircuitTable>
  <StickyPanel className={stickyClass}>
    44
  </StickyPanel>
  {/snippet}
</Container>
