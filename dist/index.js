import juice from"juice";import postcss from"postcss";import calc from"postcss-calc";const VARIABLE_DEFINITION_REGEX=/(--[\w-]+)\s*:\s*([^;]+);/g,VARIABLE_USAGE_REGEX=/var\((\s*--[a-zA-Z0-9-_]+\s*)(?:\)|,\s*(.*)\))/g,REM_UNIT_REGEX=/([\d.]+)rem/g,CLASS_ATTRIBUTE_REGEX=/ class="[^"]*"/g,handleCssVariables=e=>{const s=new Map;let r=e.replace(VARIABLE_DEFINITION_REGEX,((e,r,E)=>(s.set(r.trim(),E.trim()),""))),E=1e3;for(;VARIABLE_USAGE_REGEX.test(r)&&E>0;)E--,r=r.replace(VARIABLE_USAGE_REGEX,((e,r,E)=>{const t=r.trim();return s.get(t)||(null==E?void 0:E.trim())||""}));if(E<=0)throw new Error("Max Cycles for replacement exceeded");return r||""},inlineStyles=(e,s,r=!0)=>{let E=s;r&&(E=s.replace(REM_UNIT_REGEX,((e,s)=>16*parseFloat(s)+"px")));const t=handleCssVariables(E),c=postcss().use(calc({})).process(t).css;return juice(e,{extraCss:c}).replace(CLASS_ATTRIBUTE_REGEX,"")};export default inlineStyles;