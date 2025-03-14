<script>
  import Button from "@zr/ui/Button";
  import { tomatoActor } from "../store";
  let disabled = $state(false);
  $tomatoActor.subscribe((state) => {
    disabled = state.value === "Done";
  });
  function clickFinish() {
    $tomatoActor.send({ type: "finish" });
  }
</script>

<Button color="primary" {disabled} onclick={clickFinish}>结束</Button>
