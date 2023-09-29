<div align="center">

# Inline HTML Styles

Inline (Tailwind) CSS stylesheets into HTML style attributes.

![Static Badge](https://img.shields.io/badge/inline--html--styles-blue?logo=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Finline-html-styles)
![npm](https://img.shields.io/npm/v/inline-html-styles)
![npm bundle size](https://img.shields.io/bundlephobia/min/inline-html-styles)
![LICENSE](https://img.shields.io/npm/l/inline-html-styles)

</div>

English | [中文](./README-zh_CN.md)

## ✨ Features

- Unit conversion (rem -> px)
- Convert CSS stylesheets variables to static
- Simplify CSS stylesheets calc() expressions
- Inline CSS stylesheets into HTML style attributes

## 🤹 Scenario

When you use Vue / React and **TailwindCSS** to develop a static page for the following scenarios. You can use this method to inline the CSS stylesheet into HTML style attributes.

- ✉️ Email
- ☘️ Wechat Articles

Of course, I advice you should compile to Static Site Generation (**SSG**). To make it easier for you to work directly with html and css strings.

## 📦 Install

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

You can also add -D to install it as a development dependency, depending on your project or usage scenario.

## 🔨 Usage

#### Convert unit `rem` to `px`

You can convert CSS units from `rem` to `px`.

```javascript
const html = `<div class="my-style"></div>`
const css = `.my-style { width: 10rem }`

const result = inlineStylesIntoHtml(html, css)
// Result: <div style="width: 160px;"></div>
```

#### Simplify base `calc`

The function can simplify basic `calc` expressions in your CSS.

```javascript
const html = `<div class="my-style"></div>`
const css = `.my-style { width: calc(20px - 4px) }`

const result = inlineStylesIntoHtml(html, css)
// Result: <div style="width: 16px;"></div>
```

#### Simplify nested `calc`

Even nested `calc` expressions can be simplified.

```javascript
const html = `<div class="my-style"></div>`
const css = `.my-style { width: calc(20px - calc(10px - 6px)) }`

const result = inlineStylesIntoHtml(html, css)
// Result: <div style="width: 16px;"></div>
```

#### Different Units in `calc` Will Not Be Simplified

When `calc` expressions involve different units, they will not be simplified but will be converted appropriately.

```javascript
const html = `<div class="my-style"></div>`
const css = `.my-style { width: calc(100vh - 4rem) }`

const result = inlineStylesIntoHtml(html, css)
// Result: <div style="width: calc(100vh - 64px);"></div>
```

#### Convert number variables

CSS variables that are numerical can also be processed. And participate in calc Simplify

```javascript
const html = `<div class="my-style"></div>`
const css = `.my-style { --tw-space-y: 2; margin-top:calc(.5rem * var(--tw-space-y)) }`

const result = inlineStylesIntoHtml(html, css)
// Result: <div style="margin-top: 16px;"></div>
```

#### Convert color variables

CSS color variables can be applied as well.

```javascript
const html = `<div class="my-style"></div>`
const css = `.my-style { --my-color: #888888; color: var(--my-color) }`

const result = inlineStylesIntoHtml(html, css)
// Result: <div style="color: #888888;"></div>
```

#### Full File Example

You can also use multiple properties, including custom properties (CSS variables), in a single style rule.

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
// Result: <div style="width: 160px; margin-top: 16px; height: calc(100vh - 64px); color: #888888;"></div>
```

### Reference

- [Tailwind CSS for Email](https://github.com/jakobo/codedrift/discussions/104)
- [juice](https://github.com/Automattic/juice)
