<template>
  <div class="">
    <router-view />
    <PlayMusic />
    <ButtomMenu />
  </div>
</template>

<script lang="ts">
import PlayMusic from "@/components/app/PlayMusic.vue";
import $store from "@/store/index";
import ButtomMenu from "@/components/app/ButtomMenu.vue";

export default {
  name: "app",
  components: { PlayMusic, ButtomMenu },
  $store,
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}

body {
  background-color: rgb(245, 245, 245);
}
.app {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
