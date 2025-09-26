<script>
  import Model from "@zr/ui/Model";
  import GameIcon from "../GameIcon.svelte";
  import {
    showMagic,
    selectedCrystalCircuit,
    comboSize,
    circuitMap,
  } from "../../store";
  import Badge from "@zr/ui/Badge";
  import Button from "@zr/ui/Button";
  import CrystalCircuitCombo from "./CrystalCircuitCombo.svelte";
  import calcMagicListCompUtil from "../../utils/calcMagicListComp.js";

  let magicListComp = $state([]);
  let validCombosForMagic = $state(new Map());
  let showCombo = $state(false);
  let selectedMagicName = $state("");

  $effect(() => {
    const result = calcMagicListCompUtil(
      $selectedCrystalCircuit,
      $comboSize,
      circuitMap,
    );
    magicListComp = result.magicListComp;
    validCombosForMagic = result.validCombosForMagic;
  });
</script>

<Model
  className="h-[60dvh]"
  isShow={$showMagic}
  onchange={(e) => showMagic.set(!!e.target?.checked)}
>
  {#snippet title()}
    魔法列表（<Badge color="primary">{magicListComp.length}</Badge>可用）
  {/snippet}
  <div class="w-full h-full overflow-x-scroll overflow-y-scroll">
    <table class="table w-fit h-fit">
      <thead class="sticky top-0 bg-white z-10">
        <tr>
          <th class="sticky left-0 bg-white">名称</th>
          <th class="max-sm:hidden">ep</th>
          <th class="max-sm:hidden">类型</th>
          <th class="max-sm:hidden">伤害</th>
          <th class="max-sm:hidden">指向</th>
          <th class="max-sm:hidden">效果</th>
          <th class="sticky right-0 bg-white"></th>
        </tr>
      </thead>
      <tbody>
        {#each magicListComp as magic}
          <tr>
            <td class="sticky left-0 bg-white text-nowrap h-full">
              <GameIcon name={`${magic.attribute}-magic`} />{magic.name}
            </td>
            <td class="max-sm:hidden"><Badge>{magic.ep_cost}</Badge></td>
            <td class="max-sm:hidden">{magic.type}</td>
            <td class="max-sm:hidden">
              <GameIcon name={magic.damage} />
            </td>
            <td class="max-sm:hidden whitespace-nowrap">
              <GameIcon name={`${magic.target}-${magic.range}`} /><Badge
                >{magic.rangeAppend}</Badge
              >
            </td>
            <td class="max-sm:hidden">{magic.effect}</td>
            <td class="text-nowrap sticky right-0 bg-white">
              <Button
                onclick={() => {
                  selectedMagicName = magic.name;
                  showCombo = true;
                }}
              >
                组合
              </Button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</Model>

<CrystalCircuitCombo
  {validCombosForMagic}
  magicName={selectedMagicName}
  isShow={showCombo}
  onchange={(e) => (showCombo = !!e.target?.checked)}
/>
