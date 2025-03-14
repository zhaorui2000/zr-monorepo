<script>
  import Button from "@zr/ui/Button";
  import { tomatoActor } from "../store";
  let disabled = $state(false);
  $tomatoActor.subscribe((state) => {
    disabled = state.value === "Doing";
  });
  function clickStart() {
    $tomatoActor.send({ type: "start" });
  }
</script>

<Button color="primary" {disabled} onclick={clickStart}>开始</Button>
