<template>
  <div class="">
    <router-view />
    <PlayMusic />
  </div>
</template>

<script lang="ts">
import PlayMusic from "./components/PlayMusic.vue";
import $store from "./store/index";
export default {
  name: "app",
  components: { PlayMusic },
  $store,
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
