<script>
  import Clock from "./modules/Clock.svelte";
  import Operate from "./modules/Operate.svelte";
  import Card from "@zr/ui/Card";
  import StatusViewer from "./modules/StatusViewer.svelte";
</script>

<div class="p-4">
  <Clock></Clock>
  <Card>
    <StatusViewer></StatusViewer>
  </Card>
</div>
<Operate></Operate>
