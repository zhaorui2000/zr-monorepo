const postcss = require('postcss');
const valueParser = require('postcss-value-parser');

const defaultOptions = {
  viewportWidth: 750,
  unitPrecision: 5,
  minPixelValue: 1,
  exclude: null,
  include: null,
  skipFunctions: ['calc', 'var', 'oklch'] // 新增跳过函数列表
};

module.exports = (options = {}) => {
  const opts = { ...defaultOptions, ...options };

  return {
    postcssPlugin: 'postcss-px-to-vw',
    
    Once(root, { result }) {
      const filePath = result.opts.from || '';
      if (
        (opts.include && !opts.include.test(filePath)) ||
        (opts.exclude && opts.exclude.test(filePath))
      ) {
        return;
      }

      root.walkDecls((decl) => {
        // 跳过包含注释的声明
        if (decl.raws.value?.raw) return;

        const parsed = valueParser(decl.value);
        let needsTransform = false;

        parsed.walk((node, index, nodes) => {
          // 跳过指定函数内的处理
          if (node.type === 'function' && opts.skipFunctions.includes(node.value)) {
            return false; // 跳过该函数子节点的遍历
          }

          // 精确匹配带单位的数值
          if (node.type === 'word') {
            const match = /^(-?\d*\.?\d+)px$/i.test(node.value);
            if (match) {
              const value = parseFloat(node.value);
              if (Math.abs(value) < opts.minPixelValue) return;

              const transformed = transformValue(value, opts);
              nodes[index] = { ...node, value: transformed };
              needsTransform = true;
            }
          }
        });

        if (needsTransform) {
          decl.value = parsed.toString();
        }
      });
    }
  };
};

function transformValue(value, opts) {
  return ((value / opts.viewportWidth) * 100).toFixed(opts.unitPrecision) + 'vw';
}

module.exports.postcss = true;