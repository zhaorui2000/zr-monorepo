<script>
  import { io } from "socket.io-client";
  import Button from "@zr/ui/Button";
  import List from "@zr/ui/List";
  import ListItem from "@zr/ui/ListItem";
  import { onMount } from "svelte";
  import { socket } from "../../store";
  let roomList = $state([]);
  async function refresh() {
    let { columns, values } = await (await fetch("/api/getRooms")).json();
    let result = [];
    values.map((items, index) => {
      let row = {};
      items.map((item, i) => {
        row[columns[i]] = item;
      });
      result.push(row);
    });
    roomList = result;
  }
  function handleJoinRoom({ ip }) {
    $socket = io(`http://${ip}:20000`);
  }
  onMount(async () => {
    await refresh();
  });
</script>

<div class="w-full p-4">
  <div class="flex justify-end">
    <Button onclick={refresh}>刷新列表</Button>
  </div>
  <List>
    {#snippet title()}
      房间列表
    {/snippet}
    {#each roomList as { ip }}
      <ListItem className="cursor-alias">
        <div></div>
        <div>
          <div>🏡</div>
          <div>{ip}</div>
        </div>
        <Button
          disabled={$socket !== null}
          onclick={() => handleJoinRoom({ ip })}>加入</Button
        >
      </ListItem>
    {/each}
  </List>
</div>
