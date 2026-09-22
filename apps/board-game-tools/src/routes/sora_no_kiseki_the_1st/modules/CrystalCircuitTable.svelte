<script>
  import CrystalCircuit from "../store/crystal_circuit";
  import { selectedCrystalCircuit, requiredCrystalCircuit } from "../store";
  import { ELEMENTS } from "../store/elements";
  import Badge from "@zr/ui/Badge";
  import Checkbox from "@zr/ui/Checkbox";
  import GameIcon from "./GameIcon.svelte";

  // 勾选/取消勾选结晶回路（nanostores 无 update 方法，用 get/set）
  function toggleCircuit(id, checked) {
    const list = selectedCrystalCircuit.get();
    selectedCrystalCircuit.set(
      checked ? [...list, Number(id)] : list.filter((c) => c !== Number(id)),
    );
    // 取消选择时同步取消必带
    if (!checked) {
      const required = requiredCrystalCircuit.get();
      if (required.includes(Number(id))) {
        requiredCrystalCircuit.set(required.filter((c) => c !== Number(id)));
      }
    }
  }

  // 勾选/取消勾选必带（勾选必带时自动勾选选择）
  function toggleRequired(id, checked) {
    const required = requiredCrystalCircuit.get();
    requiredCrystalCircuit.set(
      checked
        ? [...required, Number(id)]
        : required.filter((c) => c !== Number(id)),
    );
    if (checked && !selectedCrystalCircuit.get().includes(Number(id))) {
      toggleCircuit(id, true);
    }
  }
</script>

<div class="overflow-auto">
  <table class="table w-fit h-fit">
    <thead class="sticky -top-1 bg-white z-10">
      <tr>
        <th class="sticky left-0 bg-white">名称</th>
        {#each ELEMENTS as { label }}
          <th class="max-sm:hidden">{label}</th>
        {/each}
        <th>属性</th>
        <th>效果</th>
        <th class="sticky right-16 bg-white">选择</th>
        <th class="sticky right-0 bg-white w-16">必带</th>
      </tr>
    </thead>
    <tbody>
      {#each CrystalCircuit as circuit (circuit.id)}
        <tr>
          <td class="text-nowrap sticky left-0 bg-white">
            <GameIcon name={circuit.attribute} />{circuit.name}
          </td>
          {#each ELEMENTS as { key }}
            <td class="max-sm:hidden">
              <Badge ghost className={{ hidden: circuit[key] === 0 }}
                >{circuit[key]}</Badge
              >
            </td>
          {/each}
          <td>{circuit.bonus}</td>
          <td>{circuit.effect}</td>
          <td class="sticky right-16 bg-white">
            <Checkbox
              checked={$selectedCrystalCircuit.includes(Number(circuit.id))}
              onchange={(e) => toggleCircuit(circuit.id, e.target.checked)}
            />
          </td>
          <td class="sticky right-0 bg-white w-16">
            <Checkbox
              color="primary"
              checked={$requiredCrystalCircuit.includes(Number(circuit.id))}
              onchange={(e) => toggleRequired(circuit.id, e.target.checked)}
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
