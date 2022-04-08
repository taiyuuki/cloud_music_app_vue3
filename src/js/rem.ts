// 初始化rem设置
function initRem() {
  let screenWith = document.documentElement.clientWidth;
  if (screenWith >= 750) {
    screenWith = 750
  }
  if (screenWith <= 320) {
    screenWith = 320
  }
  document.documentElement.style.fontSize = (screenWith / 7.5) + 'px'
  document.body.style.fontSize = "0.16rem"
}
initRem()
window.onresize = () => initRem()


/**
 * 采用rem布局
 * 屏幕以750px为标准
 * 1rem=100px
 */