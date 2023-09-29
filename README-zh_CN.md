<div align="center">

# 内联 HTML Styles

将（Tailwind）CSS 样式表转换为 HTML 内联 Style 样式

![npm](https://img.shields.io/badge/inline--html--styles-blue?logo=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Finline-html-styles)
![npm](https://img.shields.io/npm/v/inline-html-styles)
![npm 包大小](https://img.shields.io/bundlephobia/min/inline-html-styles)
![LICENSE](https://img.shields.io/npm/l/inline-html-styles)

</div>

[English](./README.md) | 中文

## ✨ 功能

- 单位转换（rem -> px）
- 将 CSS 样式表变量转换为静态
- 简化 CSS 样式表的 calc() 表达式
- 将 CSS 样式表内联到 HTML 样式属性中

## 🤹 场景

当你使用 Vue / React 和 **TailwindCSS** 开发静态页面时，针对以下场景，你可以使用这种方法将 CSS 样式表内联到 HTML 样式属性中。

- ✉️ 邮件
- ☘️ 微信文章

当然，我建议你应该先编译为静态站点（**SSG**）。这样便于你直接使用 HTML 和 CSS 字符串。

## 📦 安装

```bash
bun add inline-html-styles
```

```bash
pnpm add inline-html-styles
```

```bash
yarn add inline-html-styles
```

```bash
npm install inline-html-styles
```

你也可以添加 -D 参数将其安装为开发依赖项，具体取决于你的项目或使用场景。

## 🔨 使用

#### 转换单位 `rem` 为 `px`

你可以将 CSS 单位从 `rem` 转换为 `px`。

```javascript
const html = `<div class="my-style"></div>`
const css = `.my-style { width: 10rem }`

const result = inlineStylesIntoHtml(html, css)
// 结果：<div style="width: 160px;"></div>
```

#### 简化基础 `calc`

该函数可以在你的 CSS 中简化基础的 `calc` 表达式。

```javascript
const html = `<div class="my-style"></div>`
const css = `.my-style { width: calc(20px - 4px) }`

const result = inlineStylesIntoHtml(html, css)
// 结果：<div style="width: 16px;"></div>
```

#### 简化嵌套 `calc`

即使是嵌套的 `calc` 表达式也可以被简化。

```javascript
const html = `<div class="my-style"></div>`
const css = `.my-style { width: calc(20px - calc(10px - 6px)) }`

const result = inlineStylesIntoHtml(html, css)
// 结果：<div style="width: 16px;"></div>
```

#### `calc` 中不同单位不会被简化

当 `calc` 表达式涉及不同的单位时，它们将不会被简化，但会被适当地转换。

```javascript
const html = `<div class="my-style"></div>`
const css = `.my-style { width: calc(100vh - 4rem) }`

const result = inlineStylesIntoHtml(html, css)
// 结果：<div style="width: calc(100vh - 64px);"></div>
```

#### 转换数值变量

数值型的 CSS 变量也可以被处理，并参与 calc 的简化。

```javascript
const html = `<div class="my-style"></div>`
const css = `.my-style { --tw-space-y: 2; margin-top:calc(.5rem * var(--tw-space-y)) }`

const result = inlineStylesIntoHtml(html, css)
// 结果：<div style="margin-top: 16px;"></div>
```

#### 转换颜色变量

CSS 颜色变量也可以被应用。

```javascript
const html = `<div class="my-style"></div>`
const css = `.my-style { --my-color: #888888; color: var(--my-color) }`

const result = inlineStylesIntoHtml(html, css)
// 结果：<div style="color: #888888;"></div>
```

#### 完整文件示例

你还可以在单个样式规则中使用多个属性，包括自定义属性（CSS 变量）。

```javascript
const html = `<div class="my-style"></div>`
const css = `
  .my-style {
    --tw-space-y: 2;
    --my-color: #888888;
    width: 10rem;
    margin-top:calc(.5rem * var(--tw-space-y));
    height: calc(100vh - 4rem);
    color: var(--my-color);
  }`

const result = inlineStylesIntoHtml(html, css)
// 结果：<div style="width: 160px; margin-top: 16px; height: calc(100vh - 64px); color: #888888;"></div>
```

### 参考

- [Tailwind CSS for Email](https://github.com/jakobo/codedrift/discussions/104)
- [juice](https://github.com/Automattic/juice)