<template>
  <div class="tip">{{ tiptext }}</div>
</template>

<script>
export default {
  name: "tip",
  props: ["tiptext"],
};
</script>

<style lang="less">
.tip {
  position: absolute;
  display: inline-block;
  height: 1rem;
  top: 0.2rem;
  right: 0.2rem;
  padding: 0.2rem;
  background-color: rgb(223, 223, 223);
  box-shadow: 0px 0px 5px #000;
  line-height: 0.6rem;
  font-size: 0.3rem;
  font-family: "微软雅黑", "ht", "heiti", "黑体";
  color: rgb(0, 0, 0);
  text-align: center;
  z-index: 3;
}
</style>