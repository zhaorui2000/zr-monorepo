<script>
  import Button from "@zr/ui/Button";
  async function add() {
    await (await fetch("/api/createRoom")).json();
  }
</script>

<div>
  <Button onclick={add}>创建房间</Button>
</div>
