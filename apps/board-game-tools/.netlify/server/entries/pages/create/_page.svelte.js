import { D as pop, A as push } from "../../../chunks/index.js";
import { B as Button } from "../../../chunks/Button.js";
function _page($$payload, $$props) {
  push();
  async function add() {
    await (await fetch("/api/createRoom")).json();
  }
  $$payload.out += `<div>`;
  Button($$payload, {
    onclick: add,
    children: ($$payload2) => {
      $$payload2.out += `<!---->创建房间`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  pop();
}
export {
  _page as default
};
