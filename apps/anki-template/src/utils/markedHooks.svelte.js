export default {
  preprocess(markdown) {
    return markdown
      .replace(/\n/g, "\n\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\*\*“([\u4e00-\u9fa5]+)”\*\*/g, '"**$1**"')
      .replace(/\$\$(.*?)\$\$|\$(.*?)\$/gs, (_, display, inline) => {
        try {
          return katex.renderToString(inline || display, { throwOnError: false });
        } catch {
          return (inline || display) ?? "";
        }
      });
  },
};
