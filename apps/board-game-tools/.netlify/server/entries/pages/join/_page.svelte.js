import { P as spread_attributes, N as ensure_array_like, K as escape_html, Q as store_get, R as unsubscribe_stores, D as pop, A as push, S as store_set } from "../../../chunks/index.js";
import { io } from "socket.io-client";
import { B as Button } from "../../../chunks/Button.js";
import { s as socket } from "../../../chunks/index4.js";
function List($$payload, $$props) {
  const { title, children } = $$props;
  $$payload.out += `<ul class="list bg-base-100 rounded-box shadow-md">`;
  if (title) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<li class="p-4 pb-2 text-xs opacity-60 tracking-wide">`;
    title?.($$payload);
    $$payload.out += `<!----></li>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  children?.($$payload);
  $$payload.out += `<!----></ul>`;
}
function ListItem($$payload, $$props) {
  let { children, $$slots, $$events, ...restProps } = $$props;
  $$payload.out += `<li${spread_attributes({ class: "list-row", ...restProps })}>`;
  children?.($$payload);
  $$payload.out += `<!----></li>`;
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let roomList = [];
  async function refresh() {
    let { columns, values } = await (await fetch("/api/getRooms")).json();
    let result = [];
    values.map((items, index) => {
      let row = {};
      items.map((item, i) => {
        row[columns[i]] = item;
      });
      result.push(row);
    });
    roomList = result;
  }
  function handleJoinRoom({ ip }) {
    store_set(socket, io(`http://${ip}:20000`));
  }
  $$payload.out += `<div class="w-full p-4"><div class="flex justify-end">`;
  Button($$payload, {
    onclick: refresh,
    children: ($$payload2) => {
      $$payload2.out += `<!---->刷新列表`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> `;
  {
    let title = function($$payload2) {
      $$payload2.out += `<!---->房间列表`;
    };
    List($$payload, {
      title,
      children: ($$payload2) => {
        const each_array = ensure_array_like(roomList);
        $$payload2.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let { ip } = each_array[$$index];
          ListItem($$payload2, {
            className: "cursor-alias",
            children: ($$payload3) => {
              $$payload3.out += `<div></div> <div><div>🏡</div> <div>${escape_html(ip)}</div></div> `;
              Button($$payload3, {
                disabled: store_get($$store_subs ??= {}, "$socket", socket) !== null,
                onclick: () => handleJoinRoom({ ip }),
                children: ($$payload4) => {
                  $$payload4.out += `<!---->加入`;
                },
                $$slots: { default: true }
              });
              $$payload3.out += `<!---->`;
            },
            $$slots: { default: true }
          });
        }
        $$payload2.out += `<!--]-->`;
      }
    });
  }
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
