import { expect, test } from 'vitest'
import inlineStylesIntoHtml from '../src/index'

test('Unit conversion', () => {
  const html = `<div class="my-style"></div>`
  const css = `.my-style { width: 10rem }`

  const result = inlineStylesIntoHtml(html, css)
  const expected = `<div style="width: 160px;"></div>`

  expect(result).toBe(expected)
})

test('simplify base calc', () => {
  const html = `<div class="my-style"></div>`
  const css = `.my-style { width: calc(20px - 4px) }`

  const result = inlineStylesIntoHtml(html, css)
  const expected = `<div style="width: 16px;"></div>`

  expect(result).toBe(expected)
})

test('simplify nested calc', () => {
  const html = `<div class="my-style"></div>`
  const css = `.my-style { width: calc(20px - calc(10px - 6px)) }`

  const result = inlineStylesIntoHtml(html, css)
  const expected = `<div style="width: 16px;"></div>`

  expect(result).toBe(expected)
})

test('Convert number variables', () => {
  const html = `<div class="my-style"></div>`
  const css = `.my-style { --tw-space-y: 2; margin-top:calc(.5rem * var(--tw-space-y)) }`

  const result = inlineStylesIntoHtml(html, css)
  const expected = `<div style="margin-top: 16px;"></div>`

  expect(result).toBe(expected)
})

test('Convert color variables', () => {
  const html = `<div class="my-style"></div>`
  const css = `.my-style { --my-color: #888888; color: var(--my-color) }`

  const result = inlineStylesIntoHtml(html, css)
  const expected = `<div style="color: #888888;"></div>`

  expect(result).toBe(expected)
})