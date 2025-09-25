import { persistentAtom } from "@nanostores/persistent";
export const selectedCrystalCircuit = persistentAtom("sora_no_kiseki_the_1st-selected-crystal_circuit",[],{
  decode: (s) => s.split(",").map(Number),
  encode: (b) => b.join(","),
})