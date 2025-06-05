import { marked } from "marked";

export default {
  paragraph({ text }) {
    let str = text.replace(
      /\$(.*?)\$|\$\$(.*?)\$\$/g,
      function (_, inline, display) {
        const content = inline || display;
        try {
          // 使用 katex.renderToString 渲染 LaTeX 内容
          return katex.renderToString(content, {
            throwOnError: false,
          });
        } catch (e) {
          // 如果渲染失败，保留原始内容（或可选地显示错误）
          return content ?? "";
        }
      }
    );
    return `<p>${str}</p>`;
  },
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
