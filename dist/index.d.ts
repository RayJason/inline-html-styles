/**
 * 将 CSS 处理并内联到 HTML 中
 * Process and inline CSS into HTML
 * @param {string} html
 * @param {string} css
 * @param {boolean} remToPx 是否将 rem 转换为 px / Convert CSS units from rem to px?
 * @returns {string}
 */
declare const inlineStyles: (html: string, css: string, remToPx?: boolean) => string;
export default inlineStyles;
