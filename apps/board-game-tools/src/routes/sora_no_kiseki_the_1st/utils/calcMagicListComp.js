import magicList from "../store/magic";
import canUseMagic from "./canUseMagic.js";
import combinations from "./combinations.js";
import sumElements from "./sumElements.js";

export default function calcMagicListComp(selectedCrystalCircuit, comboSize, circuitMap) {
  const newValidCombosForMagic = new Map();

  const magicListComp = magicList.filter((magic) => {
    const validCombos = [];
    let minComboSize = null;

    // 从1个结晶回路开始，逐步增加到comboSize，找到最小有效组合
    for (let size = 1; size <= Math.min(comboSize, selectedCrystalCircuit.length); size++) {
      const combos = combinations(selectedCrystalCircuit, size);
      
      combos.forEach((combo) => {
        const totals = sumElements(combo);
        if (canUseMagic(magic, totals)) {
          // 如果这是第一次找到有效组合，记录最小组合大小
          if (minComboSize === null) {
            minComboSize = size;
          }
          
          // 只保存最小组合大小的组合
          if (size === minComboSize) {
            // 将结晶回路ID转换为名称
            const comboNames = combo.map((id) => {
              const circuit = circuitMap.get(Number(id));
              return circuit ? circuit.name : `ID:${id}`;
            });

            validCombos.push({
              combo: combo, // 保留原始ID用于其他用途
              comboNames: comboNames, // 结晶回路名称数组
              totals: totals,
              size: size, // 组合大小
            });
          }
        }
      });
      
      // 如果已经找到有效组合，不需要继续寻找更大的组合
      if (minComboSize !== null) {
        break;
      }
    }

    if (validCombos.length > 0) {
      newValidCombosForMagic.set(magic.name, validCombos);
      return true;
    }
    return false;
  });

  return {
    magicListComp,
    validCombosForMagic: newValidCombosForMagic
  };
}