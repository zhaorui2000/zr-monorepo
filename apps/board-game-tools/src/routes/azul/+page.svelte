<script>
  import Divider from "@zr/ui/Divider";
  import Bottom from "./modules/Bottom.svelte";
  import Message from "./modules/ScoreMessage.svelte";
  import Option from "./modules/Option.svelte";
  import MainFloor from "./modules/MainFloor.svelte";
  import MinueFloor from "./modules/MinueFloor.svelte";
  import Container from "@zr/ui/Container";
  import StickyPanel from "@zr/ui/StickyPanel";
  import { cx } from "class-variance-authority";
</script>

<Container>
  {#snippet children({ stickyClass })}
    <Option></Option>
    <div class="flex items-center flex-col">
      <MainFloor></MainFloor>
      <Divider />
      <MinueFloor></MinueFloor>
    </div>
    <StickyPanel
      insetShadow
      className={cx("mt-4", stickyClass)}
    >
      <div>
        <Message></Message>
        <Bottom></Bottom>
      </div>
    </StickyPanel>
  {/snippet}
</Container>