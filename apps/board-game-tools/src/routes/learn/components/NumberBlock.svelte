<script>
  import Countdown from "@zr/ui/Countdown";
  import { isLearning } from "../store";
  const { value } = $props();
</script>

<Countdown
  {value}
  color={$isLearning ? "primary" : "success"}
  className="grow flex items-center justify-center text-2xl h-24"
/>
