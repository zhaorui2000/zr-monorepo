export default {
  preprocess(markdown) {
    return markdown
      .replace(/\n/g, "\n\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\$\$(.*?)\$\$|\$(.*?)\$/gs, (_, display, inline) => {
        try {
          return katex.renderToString(inline || display, { throwOnError: false });
        } catch {
          return (inline || display) ?? "";
        }
      });
  },
};
