export default {
  /** @param {{ text: string }} token */
  strong({ text }) {
    return `<span class="font-bold">${text}</span>`;
  },
  /** @param {{ items: { tokens: any[] }[], ordered: boolean }} token */
  list({ items, ordered }) {
    const tag = ordered ? "ol" : "ul";
    const listClass = ordered ? "list-decimal" : "list-disc";
    return `<${tag} class="${listClass} list-inside pl-5 space-y-1">${items
      .map((/** @type {any} */ item) => {
        const { tokens } = item;
        const text = tokens
          .map((/** @type {any} */ token) =>
            token.type === "paragraph"
              ? this.parser.parseInline(token.tokens)
              : this.parser.parse([token]),
          )
          .join("");
        return `<li>${text}</li>`;
      })
      .join("")}</${tag}>`;
  },
  hr() {
    return `<div class="divider"></div>`;
  },
};
