<script>
  import Container from "@zr/ui/Container";
  import StickyPanel from "@zr/ui/StickyPanel";
  import CrystalCircuitTable from "./modules/CrystalCircuitTable.svelte";
  import Option from "./modules/Option.svelte";
  import Magic from "./modules/Magic.svelte";
  import { cx } from "class-variance-authority";
</script>

<Container className="w-full h-full" position="bottom">
  {#snippet children({ stickyClass, bgBaseClass })}
    <CrystalCircuitTable />
    <Magic />
    <StickyPanel insetShadow className={cx(stickyClass, bgBaseClass(200))}>
      <div class="py-4">
        <Option />
      </div>
    </StickyPanel>
  {/snippet}
</Container>
