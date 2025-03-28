import { marked } from "marked";

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
  hr(){
    return `<div class="divider"></div>`
  }
};
