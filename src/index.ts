import juice from 'juice'
import postcss from 'postcss'
import calc from 'postcss-calc'

// 定义正则表达式
// Define regular expression
const VARIABLE_DEFINITION_REGEX = /(--[\w-]+)\s*:\s*([^;]+);/g
const VARIABLE_USAGE_REGEX = /var\((\s*--[a-zA-Z0-9-_]+\s*)(?:\)|,\s*(.*)\))/g
const REM_UNIT_REGEX = /([\d.]+)rem/g
const CLASS_ATTRIBUTE_REGEX = / class="[^"]*"/g

/**
 * 将 CSS 变量转换为静态值
 * Convert CSS variables to static values
 * Reference https://github.com/jakobo/codedrift/discussions/104
 * @param {string} style
 * @returns {string}
 */
const handleCssVariables = (style: string): string => {
  const variableDefinitions = new Map<string, string>()
  let styleWithoutDefinitions = style.replace(
    VARIABLE_DEFINITION_REGEX,
    (_, variable, value) => {
      variableDefinitions.set(variable.trim(), value.trim())
      return ''
    }
  )

  let maxCycles = 1000
  while (VARIABLE_USAGE_REGEX.test(styleWithoutDefinitions) && maxCycles > 0) {
    maxCycles--
    styleWithoutDefinitions = styleWithoutDefinitions.replace(
      VARIABLE_USAGE_REGEX,
      (_, variable, fallback) => {
        const key = variable.trim()
        return variableDefinitions.get(key) || fallback?.trim() || ''
      }
    )
  }

  if (maxCycles <= 0) {
    throw new Error('Max Cycles for replacement exceeded')
  }

  return styleWithoutDefinitions || ''
}

/**
 * 配置
 * Config
 * @interface Config
 * @property {boolean} remToPx 是否将 CSS 单位 rem 转换为 px
 * @property {boolean} convertCssVariables 是否将 CSS 变量转换为常量
 */
interface Options {
  remToPx?: boolean
  convertCssVariables?: boolean
}

/**
 * 将 CSS 处理并内联到 HTML 中
 * Process and inline CSS into HTML
 * @param {string} html
 * @param {string} css
 * @param {Options} options
 * @returns {string}
 */
const inlineStyles = (html: string, css: string, options?: Options): string => {
  const { remToPx = true, convertCssVariables = true } = options || {}

  // 将 CSS 单位 rem 转换为 px
  // Convert CSS units from rem to px
  const basePx = 16
  let cssWithUnitConversion = css
  if (remToPx) {
    cssWithUnitConversion = css.replace(
      REM_UNIT_REGEX,
      (_, value) => `${parseFloat(value) * basePx}px`
    )
  }

  // 将 CSS 变量转换为常量
  // Convert CSS variables to static
  let cssWithoutVariables = cssWithUnitConversion
  if (convertCssVariables) {
    cssWithoutVariables = handleCssVariables(cssWithUnitConversion)
  }

  // 简化 calc() 表达式
  // Simplify calc() expressions
  const simplifiedCss = postcss().use(calc({})).process(cssWithoutVariables).css

  // 将 CSS 内联到 HTML 中
  // Inline CSS into HTML
  const htmlWithInlinedCss = juice(html, {
    extraCss: simplifiedCss
  })

  // 移除 HTML 中的 class 属性
  // remove class attributes from HTML
  const htmlWithoutClassAttributes = htmlWithInlinedCss.replace(
    CLASS_ATTRIBUTE_REGEX,
    ''
  )

  return htmlWithoutClassAttributes
}

export default inlineStyles
