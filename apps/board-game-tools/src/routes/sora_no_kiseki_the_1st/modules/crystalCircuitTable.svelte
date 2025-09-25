<script>
  import CrystalCircuit from "../store/crystal_circuit";
  import Checkbox from "@zr/ui/Checkbox";
  import { selectedCrystalCircuit } from "../store";
  import { produce } from "immer";
  function handleChangeCheckbox(e, { id }) {
    selectedCrystalCircuit.set(
      produce(selectedCrystalCircuit.get(), (draft) => {
        let draftSet = new Set(draft);
        if (e.target.checked) {
          draftSet.add(Number(id));
        } else {
          draftSet.delete(Number(id));
        }
        return Array.from(draftSet);
      }),
    );
  }
</script>

<table class="table">
  <thead>
    <tr>
      <th>名称</th>
      <th>属性</th>
      <th>地</th>
      <th>水</th>
      <th>火</th>
      <th>风</th>
      <th>时</th>
      <th>空</th>
      <th>幻</th>
      <th>属性</th>
      <th>效果</th>
      <th>拥有</th>
    </tr>
  </thead>
  <tbody class="overflow-y-scroll">
    {#each CrystalCircuit as { name, attribute, earth, water, fire, wind, time, space, illusion, effect, bonus, id }}
      <tr>
        <td>{name}</td>
        <td>{attribute}</td>
        <td>{earth}</td>
        <td>{water}</td>
        <td>{fire}</td>
        <td>{wind}</td>
        <td>{time}</td>
        <td>{space}</td>
        <td>{illusion}</td>
        <td>{bonus}</td>
        <td>{effect}</td>
        <td
          ><Checkbox checked={$selectedCrystalCircuit.includes(Number(id))} onchange={(e) => handleChangeCheckbox(e, { id })}
          ></Checkbox></td
        >
      </tr>
    {/each}
  </tbody>
</table>
