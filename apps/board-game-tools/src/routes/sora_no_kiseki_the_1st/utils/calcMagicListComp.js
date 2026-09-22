import magicList from "../store/magic";
import canUseMagic from "./canUseMagic.js";
import combinations from "./combinations.js";
import sumElements from "./sumElements.js";

// 搜索能组合出该魔法的最小槽位回路组合（从最小槽位递增，首个命中即为最小；必带回路固定包含）
function findMinCombos(magic, selectedIds, requiredIds, comboSize, circuitMap) {
  const required = requiredIds.filter((id) => selectedIds.includes(id));
  const rest = selectedIds.filter((id) => !required.includes(id));
  const startSize = Math.max(required.length, 1);
  for (let size = startSize; size <= Math.min(comboSize, selectedIds.length); size++) {
    const validCombos = [];
    for (const extra of combinations(rest, size - required.length)) {
      const combo = [...required, ...extra];
      if (!canUseMagic(magic, sumElements(combo))) continue;
      validCombos.push({
        comboNames: combo.map((id) => circuitMap.get(Number(id))?.name ?? `ID:${id}`),
        size,
      });
    }
    if (validCombos.length > 0) return validCombos;
  }
  return [];
}

// 计算可用魔法列表及每个魔法对应的最小回路组合（必带回路始终参与组合）
export default function calcMagicListComp(selectedCrystalCircuit, requiredCrystalCircuit, comboSize, circuitMap) {
  const validCombosForMagic = new Map();
  const magicListComp = magicList.filter((magic) => {
    const validCombos = findMinCombos(magic, selectedCrystalCircuit, requiredCrystalCircuit, comboSize, circuitMap);
    if (validCombos.length === 0) return false;
    validCombosForMagic.set(magic.name, validCombos);
    return true;
  });
  return { magicListComp, validCombosForMagic };
}
