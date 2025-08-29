<script>
  import Divider from "@zr/ui/Divider";
  import Bottom from "./modules/Bottom.svelte";
  import Message from "./modules/ScoreMessage.svelte";
  import Option from "./modules/Option.svelte";
  import MainFloor from "./modules/MainFloor.svelte";
  import MinueFloor from "./modules/MinueFloor.svelte";
</script>

<div class="flex items-center justify-center">
  <div>
    <MainFloor></MainFloor>
    <Divider />
    <MinueFloor></MinueFloor>
  </div>
</div>
<div class="flex px-2">
  <Option></Option>
  <Message></Message>
</div>

<Bottom></Bottom>
