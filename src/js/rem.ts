// 初始化rem设置
function initRem() {
  let screenWidth = document.documentElement.clientWidth;
  if (screenWidth >= 750) {
    screenWidth = 750
  }
  if (screenWidth <= 320) {
    screenWidth = 320
  }
  document.documentElement.style.fontSize = (screenWidth / 7.5) + 'px'
  document.body.style.fontSize = "0.16rem"
}
initRem()
window.onresize = () => initRem()


/**
 * 采用rem布局
 * 屏幕以750px为标准
 * 1rem=100px
 */