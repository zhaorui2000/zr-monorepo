| 文件夹 | 题目   |
| ------ | ------ |
| MCQs   | 单选题 |
| FIQs   | 填空题 |
| SAQs   | 问答题 |

# Anki Card Template Builder

> 一个基于 Svelte 和 Vite 的 Anki 卡片模板开发框架，帮助快速创建、自定义和导出 Anki 卡片样式。

## 🚀 项目简介

- **目标**：提供一个可扩展的前端框架，用于设计和预览 Anki 卡片模板，并导出为 Anki 支持的 HTML/CSS 格式。
- **特点**：
  - 支持卡片正反面布局自定义
  - 内置样式预设（如字体、颜色、边框）
  - 实时预览功能
  - 导出为 Anki 可导入的模板文件
  - 支持动态内容占位符（如 `{{Front}}`, `{{Back}}`）

## 🛠️ 技术栈

- **前端框架**：Svelte
- **构建工具**：Vite
- **样式**：Tailwind CSS + daisyui
- **状态管理**：Svelte Stores
- **导出工具**：自定义 HTML/CSS 生成器

---

## 📦 安装与运行

### 1. 克隆项目

```bash git clone https://github.com/your-repo/anki-card-template.gitcd anki-card-template

```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm dev
```

> 访问  `http://localhost:5173`  查看实时预览。

### 4. 构建生产版本

```bash
pnpm run build
```

> 构建后的文件位于  `dist/`  目录。
