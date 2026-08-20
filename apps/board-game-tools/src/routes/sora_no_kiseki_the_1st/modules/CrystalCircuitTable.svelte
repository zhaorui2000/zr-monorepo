<script>
  import CrystalCircuit from "../store/crystal_circuit";
  import { selectedCrystalCircuit } from "../store";
  import { ELEMENTS } from "../store/elements";
  import Badge from "@zr/ui/Badge";
  import Checkbox from "@zr/ui/Checkbox";
  import GameIcon from "./GameIcon.svelte";

  // 勾选/取消勾选结晶回路（nanostores 无 update 方法，用 get/set）
  function toggleCircuit(id, checked) {
    const list = selectedCrystalCircuit.get();
    selectedCrystalCircuit.set(
      checked
        ? [...list, Number(id)]
        : list.filter((c) => c !== Number(id)),
    );
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
        <th class="sticky right-0 bg-white">选择</th>
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
              <Badge ghost className={{ hidden: circuit[key] === 0 }}>{circuit[key]}</Badge>
            </td>
          {/each}
          <td>{circuit.bonus}</td>
          <td>{circuit.effect}</td>
          <td class="sticky right-0 bg-white">
            <Checkbox
              checked={$selectedCrystalCircuit.includes(Number(circuit.id))}
              onchange={(e) => toggleCircuit(circuit.id, e.target.checked)}
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
