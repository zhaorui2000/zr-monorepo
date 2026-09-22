<script>
  import Model from "@zr/ui/Model";
  import Badge from "@zr/ui/Badge";
  import CrystalCircuitCombo from "./CrystalCircuitCombo.svelte";
  import MagicTable from "./MagicTable.svelte";
  import {
    showMagic,
    selectedCrystalCircuit,
    requiredCrystalCircuit,
    comboSize,
    circuitMap,
  } from "../../store";
  import calcMagicListComp from "../../utils/calcMagicListComp.js";

  let magicListComp = $state([]);
  let validCombosForMagic = $state(new Map());
  let showCombo = $state(false);
  let selectedMagicName = $state("");

  // 由已选回路、必带回路与空槽数量派生：可用魔法列表 + 每个魔法对应的最小回路组合
  $effect(() => {
    const result = calcMagicListComp($selectedCrystalCircuit, $requiredCrystalCircuit, $comboSize, circuitMap);
    magicListComp = result.magicListComp;
    validCombosForMagic = result.validCombosForMagic;
  });

  function openCombo(name) {
    selectedMagicName = name;
    showCombo = true;
  }
</script>

<Model
  className="h-[60dvh]"
  isShow={$showMagic}
  onchange={(e) => showMagic.set(!!e.target?.checked)}
>
  {#snippet title()}
    魔法列表（<Badge color="primary">{magicListComp.length}</Badge>可用）
  {/snippet}
  <MagicTable magicList={magicListComp} onSelect={openCombo} />
</Model>

<CrystalCircuitCombo
  {validCombosForMagic}
  magicName={selectedMagicName}
  isShow={showCombo}
  onchange={(e) => (showCombo = !!e.target?.checked)}
/>
