# Anki Card Template Builder

> 一个基于 Svelte 和 Vite 的 Anki 卡片模板开发框架，帮助快速创建、自定义和导出 Anki 卡片样式。

## 🚀 项目简介

- **目标**：提供一个可扩展的前端框架，用于设计和预览 Anki 卡片模板，并导出为 Anki 支持的 HTML/CSS 格式。
- **特点**：
  - 导出为 Anki 可用的卡片样式
  - 支持动态内容占位符（如 `{{Front}}`, `{{Back}}`）

## 🛠️ 技术栈

- **前端框架**：Svelte
- **构建工具**：Vite
- **样式**：Tailwind CSS + daisyui
- **状态管理**：nanoStore
- **导出工具**：自定义 HTML/CSS 生成器

---

## 📦 安装与运行

### 1. 克隆项目

```bash

```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 使用

```bash
pnpm run build
```

> 构建后的文件位于  `dist/`  目录

将`dist`目录中`index.html`内容粘贴到anki卡片内容模板
