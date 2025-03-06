const postcss = require("postcss");

module.exports = postcss.plugin("postcss-px-to-vw", (options = {}) => {
  // 合并默认配置
  const opts = {
    viewportWidth: 750, // 设计稿宽度（默认750px）
    unitPrecision: 5, // 小数精度
    minPixelValue: 1, // 最小转换像素值
    ...options,
  };

  // 核心处理逻辑
  return (root) => {
    root.walkDecls((decl) => {
      // 正则匹配替换
      decl.value = decl.value.replace(/(\d+\.?\d*)px/g, (match, p1) => {
        const pixels = parseFloat(p1);
        if (pixels < opts.minPixelValue) {
          return match;
        }
        const vw = ((pixels / opts.viewportWidth) * 100).toFixed(
          opts.unitPrecision
        );
        return `${vw}vw`;
      });
    });
  };
});
