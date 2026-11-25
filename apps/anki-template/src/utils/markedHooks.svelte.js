/**
 * @param {string} content
 * @param {boolean} displayMode
 */
const renderMath = (content, displayMode) => {
  const mathContent = content.replace(/\n{2,}/g, "\n").trim();

  try {
    const result = katex.renderToString(mathContent, {
      throwOnError: false,
      displayMode,
    });

    return displayMode
      ? `<div class="math-block-wrapper">${result}</div>`
      : result;
  } catch {
    return mathContent;
  }
};

export default {
  /** @param {string} markdown */
  preprocess(markdown) {
    return markdown
      .replace(/\*\*“([\u4e00-\u9fa5]+)”\*\*/g, '"**$1**"')
      .replace(/\$\$([\s\S]+?)\$\$/g, (_, display) => renderMath(display, true))
      .replace(
        /(^|[^\\$])\$(?!\$)([^$\n]+?)\$(?!\$)/g,
        (_, prefix, inline) => `${prefix}${renderMath(inline, false)}`,
      );
  },
};
