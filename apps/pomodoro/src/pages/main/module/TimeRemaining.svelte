<script>
  import { timeRemaining } from "../store";
  import formatSeconds from "@zr/utils/String/formatSeconds";
</script>

<p class="text-[160px] w-full">{formatSeconds($timeRemaining, "mm:ss")}</p>
