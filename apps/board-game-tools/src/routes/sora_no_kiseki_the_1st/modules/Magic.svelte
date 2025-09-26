<script>
  import Model from "@zr/ui/Model";
  import magicList from "../store/magic";
  import GameIcon from "./GameIcon.svelte";
  import { showMagic, selectedCrystalCircuit, comboSize } from "../store";
  import canUseMagic from "../utils/canUseMagic.js";
  import combinations from "../utils/combinations.js";
  import sumElements from "../utils/sumElements.js";
  import Badge from "@zr/ui/Badge";

  let allCombos = $state([]);
  let magicListComp = $state([]);
  function calcMagicListComp(selectedCrystalCircuit, comboSize) {
    allCombos = combinations(selectedCrystalCircuit, comboSize);
    magicListComp = magicList.filter((magic) => {
      return allCombos.some((combo) => {
        const totals = sumElements(combo);
        return canUseMagic(magic, totals);
      });
    });
  }
  selectedCrystalCircuit.subscribe((newV) => {
    calcMagicListComp(newV, $comboSize);
  });
  comboSize.subscribe((newV) => {
    calcMagicListComp($selectedCrystalCircuit, newV);
  });

  function handleToggle(e) {
    showMagic.set(!!e.target?.checked);
  }
</script>

<Model className="h-[40dvh]" isShow={$showMagic} onchange={handleToggle}>
  {#snippet title()}
    魔法可用列表 ({magicListComp.length} 个可用)
  {/snippet}
  <div class="overflow-y-scroll overflow-x-scroll w-full h-full">
    <table class="table w-fit h-fit ">
      <thead class="sticky -top-1 bg-white z-10">
        <tr>
          <th class="sticky left-0 bg-white whitespace-nowrap">名称</th>
          <th>ep消耗</th>
          <th>类型</th>
          <th>伤害</th>
          <th>指向</th>
          <th>效果</th>
        </tr>
      </thead>
      <tbody>
        {#each magicListComp as magic}
          <tr>
            <td class="sticky left-0 bg-white whitespace-nowrap flex items-center h-full"><GameIcon name={`${magic.attribute}-magic`} />{magic.name}</td>
            <td><Badge>{magic.ep_cost}</Badge></td>
            <td>{magic.type}</td>
            <td class="flex h-full items-center"><GameIcon name={magic.damage} /></td>
            <td><GameIcon name={`${magic.target}-${magic.range}`}></GameIcon></td>
            <td>{magic.effect}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</Model>
