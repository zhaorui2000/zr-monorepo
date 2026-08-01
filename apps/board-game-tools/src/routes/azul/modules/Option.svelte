<script>
  import Checkbox from "@zr/ui/Checkbox";
  import { isCheatMode } from "../store";
</script>

<div class="flex items-center">
  <Checkbox bind:checked={$isCheatMode}>自动计算空块分数</Checkbox>
</div>
