import { marked } from "marked";

export default {
  strong({ text }) {
    return `<span class="font-bold">${text}</span>`;
  },
  list({ items }) {
    return `<ul class="list">${items
      .map((item) => {
        const { tokens } = item;
        const text = marked.parser(tokens);
        return `<li class="pl-4">${text}</li>`;
      })
      .join("")}</ul>`;
  },
  hr() {
    return `<div class="divider"></div>`;
  },
};
