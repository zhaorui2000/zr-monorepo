import { marked } from "marked";
import { cva } from "class-variance-authority";

export default {
  strong({text}){
    return `<span class="font-bold">${text}</span>`
  },
  list({items}) {
    return `<ul class="pl-4 list list-disc">${items.map((item) => {
      const { tokens } = item;
      const text = marked.parser(tokens);
      return `<li class="list-row">${text}</li>`;
    }).join("")}</ul>`;
  },
  // 自定义标题渲染
  heading({ tokens, depth }) {
    const text = marked.parser(tokens);
    const style = cva("", {
      variants: {
        depth: {
          1: "h1",
          2: "h2",
          3: "h3",
          4: "h4",
          5: "h5",
          6: "h6",
        },
      },
    })({ depth });
    return `<div class="${style}">${text}</div>`;
  },
};
