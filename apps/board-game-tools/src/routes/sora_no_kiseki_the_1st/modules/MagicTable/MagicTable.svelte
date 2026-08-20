<script>
  import Badge from "@zr/ui/Badge";
  import Button from "@zr/ui/Button";
  import GameIcon from "../GameIcon.svelte";

  let { magicList = [], onSelect } = $props();
</script>

<div class="w-full h-full overflow-auto">
  <table class="table w-fit h-fit">
    <thead class="sticky top-0 bg-white z-10">
      <tr>
        <th class="sticky left-0 bg-white">名称</th>
        <th class="max-sm:hidden">ep</th>
        <th class="max-sm:hidden">类型</th>
        <th>伤害</th>
        <th class="max-sm:hidden">指向</th>
        <th class="max-sm:hidden">效果</th>
        <th class="sticky right-0 bg-white"></th>
      </tr>
    </thead>
    <tbody>
      {#each magicList as magic (magic.name)}
        <tr>
          <td class="sticky left-0 bg-white text-nowrap h-full">
            <GameIcon name={`${magic.attribute}-magic`} />{magic.name}
          </td>
          <td class="max-sm:hidden"><Badge>{magic.ep_cost}</Badge></td>
          <td class="max-sm:hidden">{magic.type}</td>
          <td><GameIcon name={magic.damage} /></td>
          <td class="max-sm:hidden whitespace-nowrap">
            <GameIcon name={`${magic.target}-${magic.range}`} /><Badge>{magic.rangeAppend}</Badge>
          </td>
          <td class="max-sm:hidden">{magic.effect}</td>
          <td class="text-nowrap sticky right-0 bg-white">
            <Button onclick={() => onSelect(magic.name)}>组合</Button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
