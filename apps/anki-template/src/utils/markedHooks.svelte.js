export default {
  preprocess(markdown) {
    let str = markdown.replace(
      /\$\$(.*?)\$\$|\$(.*?)\$/gs,
      function (_, display, inline) {
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
    return str;
  },
};
