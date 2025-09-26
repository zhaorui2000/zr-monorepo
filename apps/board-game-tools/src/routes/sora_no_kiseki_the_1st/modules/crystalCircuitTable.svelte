<script>
  import CrystalCircuit from "../store/crystal_circuit";
  import Checkbox from "@zr/ui/Checkbox";
  import { selectedCrystalCircuit } from "../store";
  import { produce } from "immer";
  import GameIcon from "./GameIcon.svelte";
  import Badge from "@zr/ui/Badge";
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

<div class="w-full h-full overflow-y-scroll overflow-x-scroll">
  <table class="table w-fit h-fit">
    <thead class="sticky -top-1 bg-white z-10">
      <tr>
        <th class="sticky left-0 bg-white">名称</th>
        <th>地</th>
        <th>水</th>
        <th>火</th>
        <th>风</th>
        <th>时</th>
        <th>空</th>
        <th>幻</th>
        <th>属性</th>
        <th>效果</th>
        <th class="sticky right-0 bg-white">选择</th>
      </tr>
    </thead>
    <tbody>
      {#each CrystalCircuit as { name, attribute, earth, water, fire, wind, time, space, illusion, effect, bonus, id }}
        <tr>
          <td class="flex items-center whitespace-nowrap h-full sticky left-0 bg-white"
            ><GameIcon name={attribute}></GameIcon>{name}</td
          >
          <td
            ><Badge ghost className={{ hidden: earth === 0 }}>{earth}</Badge
            ></td
          >
          <td
            ><Badge ghost className={{ hidden: water === 0 }}>{water}</Badge
            ></td
          >
          <td><Badge ghost className={{ hidden: fire === 0 }}>{fire}</Badge></td
          >
          <td><Badge ghost className={{ hidden: wind === 0 }}>{wind}</Badge></td
          >
          <td><Badge ghost className={{ hidden: time === 0 }}>{time}</Badge></td
          >
          <td
            ><Badge ghost className={{ hidden: space === 0 }}>{space}</Badge
            ></td
          >
          <td
            ><Badge ghost className={{ hidden: illusion === 0 }}
              >{illusion}</Badge
            ></td
          >
          <td>{bonus}</td>
          <td>{effect}</td>
          <td class="sticky right-0 bg-white"
            ><Checkbox
              checked={$selectedCrystalCircuit.includes(Number(id))}
              onchange={(e) => handleChangeCheckbox(e, { id })}
            ></Checkbox></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>
