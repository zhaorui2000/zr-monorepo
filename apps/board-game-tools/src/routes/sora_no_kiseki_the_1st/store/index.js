import { persistentAtom } from "@nanostores/persistent";
import CrystalCircuit from "./crystal_circuit";

// 构建结晶回路ID到数据的映射表
export const circuitMap = new Map(CrystalCircuit.map(c => [Number(c.id), c]));

export const selectedCrystalCircuit = persistentAtom("sora_no_kiseki_the_1st-selected-crystal_circuit", [], {
  decode: (s) => s.split(",").map(Number),
  encode: (b) => b.join(","),
})
export let showMagic = persistentAtom("sora_no_kiseki_the_1st-show-magic", false, {
  decode: (s) => s === "true",
  encode: String
})

export const comboSize = persistentAtom("sora_no_kiseki_the_1st-combo-size", 4, {
  decode: Number,
  encode: String
})