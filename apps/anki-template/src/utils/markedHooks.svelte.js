export default {
  preprocess(markdown) {
    // 删除了 .replace(/\n/g, "\n\n") 和 .replace(/\n{3,}/g, "\n\n")
    return markdown
      .replace(/\*\*“([\u4e00-\u9fa5]+)”\*\*/g, '"**$1**"')
      .replace(/\$\$(.*?)\$\$|\$(.*?)\$/gs, (_, display, inline) => {
        // 【关键修复】：将公式内部被强行注入的连续空行压缩回单换行
        // 因为我们去掉了全局的 \n\n 替换，公式内部现在通常就是正常的 \n
        const mathContent = (inline || display).replace(/\n{2,}/g, '\n').trim();

        const isDisplay = !!display;

        try {
          let result = katex.renderToString(mathContent, {
            throwOnError: false,
            displayMode: isDisplay
          });

          if (isDisplay) {
            return `<div class="math-block-wrapper">${result}</div>`;
          }
          return result;
        } catch {
          return mathContent ?? "";
        }
      });
  },
};
