<script>
  import Container from "@zr/ui/Container";
  import StickyPanel from "@zr/ui/StickyPanel";
  import CrystalCircuitTable from "./modules/CrystalCircuitTable.svelte";
  import Option from "./modules/Option.svelte";
  import Magic from "./modules/MagicTable/Index.svelte";
  import { cx } from "class-variance-authority";
</script>

<Container className="w-full h-full grid" style="grid-template-rows: 1fr min-content" position="bottom">
  {#snippet children({ stickyClass, bgBaseClass })}
    <CrystalCircuitTable />
    <StickyPanel insetShadow className={cx(stickyClass, bgBaseClass(200))}>
      <div class="pt-2">
        <Option />
      </div>
    </StickyPanel>
  {/snippet}
</Container>
<Magic />
