/**
 * 配置
 * Config
 * @interface Config
 * @property {boolean} remToPx 是否将 CSS 单位 rem 转换为 px
 * @property {boolean} convertCssVariables 是否将 CSS 变量转换为常量
 */
interface Options {
    remToPx?: boolean;
    convertCssVariables?: boolean;
}
/**
 * 将 CSS 处理并内联到 HTML 中
 * Process and inline CSS into HTML
 * @param {string} html
 * @param {string} css
 * @param {Options} options
 * @returns {string}
 */
declare const inlineStyles: (html: string, css: string, options?: Options) => string;
export default inlineStyles;
