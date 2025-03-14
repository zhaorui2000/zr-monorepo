import { atom } from "nanostores";
import { setup } from "xstate";
import { createActor } from "xstate";
import { v4 as uuid } from "uuid";

export const timeRemaining = atom();
export const start = atom(() => {})
export const finish = atom(() => {})
export const ID= uuid()

export const timeDuration = atom({
    Doing: import.meta.env.MODE === "development" ? 25: 25 * 60,
    Done: 0,
    Reset:import.meta.env.MODE === "development" ? 5: 5 * 60,
})

const tomatoMachine = setup({
  actions: {
    start: ()=>{start.get()()},
    finish: ()=>{finish.get()()},
  },
}).createMachine({
  id: "tomato",
  initial: "Done",
  states: {
    Doing: {
      on: { pause: "Pause", finish: "Done" },
      entry: [{ type: "start" }],
      exit: [{ type: "finish" }],
    },
    Pause: {
      on: { start: "Doing", finish: "Done" },
    },
    Done: {
      on: { start: "Doing" },
    },
    Reset: {
      on: { start: "Doing", finish: "Done" },
    },
  },
});
export const tomatoActor = atom(createActor(tomatoMachine));
