<template>
  <div class="login-top">
    <Icon @click="back" xurl="#icon-arrowLeft" /><span class="text">{{
      text
    }}</span>
  </div>
</template>
<script>
import Icon from "@/components/Icon.vue";
import { useRouter } from "vue-router";
export default {
  name: "login-top",
  components: { Icon },
  props: ["text"],
  setup() {
    let router = useRouter();
    const back = () => {
      router.back();
    };
    return { back };
  },
};
</script>
<style lang="less">
.login-top {
  height: 0.6rem;
  line-height: 0.6rem;
  margin-top: 0.1rem;
  display: flex;
  justify-content: left;
  .icon {
    fill: #000;
    width: 0.6rem;
    height: 0.6rem;
    cursor: pointer;
  }
  .text {
    font-size: 0.4rem;
    height: 0.6rem;
    line-height: 0.6rem;
    display: inline-block;
    padding: 0 0.2rem;
    font-family: "微软雅黑", "ht", "heiti", "黑体";
    font-weight: bold;
  }
}
</style>