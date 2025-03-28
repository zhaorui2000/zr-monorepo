const marked = require('marked');

class CustomRenderer extends marked.Renderer {
  // 自定义标题渲染
  heading(text, level) {
    return `<div class="h${level}">${text}</div>`;
  }
}