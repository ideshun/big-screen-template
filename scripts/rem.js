/*
 * @Author: ZY
 * @Date: 2021-05-24 19:25:50
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 10:21:26
 * @FilePath: \big-screen-template\scripts\rem.js
 * @Description: 文件描述
 */
const DESIGN_WIDTH = 1920;
function setHtmlFontsize() {
  const docEl = document.documentElement;
  const w = window.innerWidth;
  docEl.style.fontSize = ((w / DESIGN_WIDTH) * 100).toFixed(3) + 'px';
}
setHtmlFontsize();
window.addEventListener('resize', setHtmlFontsize);
