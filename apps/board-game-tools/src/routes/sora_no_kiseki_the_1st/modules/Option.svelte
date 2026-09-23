<script>
  import Button from "@zr/ui/Button";
  import Range from "@zr/ui/Range";
  import FieldSet from "@zr/ui/FieldSet";
  import {
    showMagic,
    comboSize,
    selectedCrystalCircuit,
    requiredCrystalCircuit,
  } from "../store";

  function handleShowMagic() {
    showMagic.set(!showMagic.get());
  }

  function handleChangeRange(e) {
    comboSize.set(Number(e.target.value));
  }

  function handleClear() {
    selectedCrystalCircuit.set([]);
    requiredCrystalCircuit.set([]);
  }

  // 仅清除必带，保留已选回路
  function handleClearRequired() {
    requiredCrystalCircuit.set([]);
  }
</script>

<div class="flex gap-x-4 items-center flex-row-reverse w-full px-4">
  <Button
    color="warning"
    className="w-fit shrink-0"
    onclick={handleClearRequired}>清除必带</Button
  >
  <Button color="error" className="w-fit shrink-0" onclick={handleClear}
    >清空</Button
  >
  <Button color="primary" className="w-fit shrink-0" onclick={handleShowMagic}
    >{$showMagic ? "隐藏" : "查看"}</Button
  >
  <FieldSet>
    {#snippet children({ labelClass })}
      <p class={labelClass}>空槽数量</p>
      <Range
        color="primary"
        step={1}
        initValue={$comboSize}
        max={6}
        min={1}
        onchange={handleChangeRange}
      ></Range>
    {/snippet}
  </FieldSet>
</div>
