<template>
  <div class="home">
    <TopBar />
    <Swiper />
    <DragonBall />
    <MusicLibrary />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TopBar from "@/components/home/TopBar.vue";
import Swiper from "../components/home/Swiper.vue";
import DragonBall from "../components/home/DragonBall.vue";
import MusicLibrary from "../components/home/MusicLibrary.vue";

@Options({
  components: { TopBar, Swiper, DragonBall, MusicLibrary },
})
export default class Home extends Vue {}
</script>

<style lang="less">
.home {
  width: 7.5rem;
  height: 3.75rem;
}
</style>
