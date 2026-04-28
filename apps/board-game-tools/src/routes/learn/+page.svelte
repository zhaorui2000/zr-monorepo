<script>
  import Clock from "./modules/Clock.svelte";
  import Operate from "./modules/Operate.svelte";
  import StatusViewer from "./modules/StatusViewer.svelte";
  import KeepWake from "./modules/KeepWake.svelte";
</script>

<div class="p-4">
  <Clock></Clock>
  <StatusViewer></StatusViewer>
  <KeepWake></KeepWake>
</div>
<Operate></Operate>
