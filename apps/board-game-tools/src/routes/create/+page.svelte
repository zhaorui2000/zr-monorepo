<script>
  import Button from "@zr/ui/Button";
  import List from "@zr/ui/List";
  import ListItem from "@zr/ui/ListItem";
  async function add() {
    let  result  = await (await fetch("/api/createRoom")).json();
  }
</script>

<div>
  <Button onclick={add}>Create</Button>
  <List>
    {#snippet title()}
      房间列表
    {/snippet}
    <ListItem>333</ListItem>
    <ListItem>555</ListItem>
  </List>
</div>