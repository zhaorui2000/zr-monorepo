<script>
  import CrystalCircuit from "../store/crystal_circuit";
  import { selectedCrystalCircuit, requiredCrystalCircuit } from "../store";
  import { ELEMENTS } from "../store/elements";
  import Badge from "@zr/ui/Badge";
  import Checkbox from "@zr/ui/Checkbox";
  import GameIcon from "./GameIcon.svelte";
  import Table from "@zr/ui/Table";
  import { cx } from "class-variance-authority";

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
  <Table pinRows pinCols>
    {#snippet thead()}
      <tr>
        <th>选择</th>
        <th>必带</th>
        <td>名称</td>
        {#each ELEMENTS as { label }}
          <td class="max-sm:hidden">{label}</td>
        {/each}
        <td>属性</td>
        <td>效果</td>
      </tr>
    {/snippet}
    {#snippet tbody({ activeClass = "", hoverClass = "" })}
      {#each CrystalCircuit as circuit (circuit.id)}
        <tr
          class={cx(hoverClass, {
            [activeClass]: $selectedCrystalCircuit.includes(Number(circuit.id)),
          })}
          onclick={(e) =>
            toggleCircuit(
              circuit.id,
              !$selectedCrystalCircuit.includes(Number(circuit.id)),
            )}
        >
          <th>
            <Checkbox
              checked={$selectedCrystalCircuit.includes(Number(circuit.id))}
              onchange={(e) => toggleCircuit(circuit.id, e.target.checked)}
            />
          </th>
          <th class="left-15">
            <Checkbox
              color="primary"
              checked={$requiredCrystalCircuit.includes(Number(circuit.id))}
              onchange={(e) => toggleRequired(circuit.id, e.target.checked)}
            />
          </th>
          <td class="text-nowrap">
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
        </tr>
      {/each}
    {/snippet}
  </Table>
</div>
