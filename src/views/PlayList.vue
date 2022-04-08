<template>
  <div class="play-list">
    <img class="bg" :src="musicData.playlist.coverImgUrl" />
    <PlayListTop :musicInfo="musicData.playlist" />
    <PlayListPanel :musicInfo="musicData.playlist" />
  </div>
</template>

<script lang='ts'>
import { reactive } from "@vue/reactivity";
import { useRoute } from "vue-router";
import getAxios from "../hook/get-axios";
import PlayListTop from "../components/playlist/PlayListTop.vue";
import PlayListPanel from "../components/playlist/PlayListPanel.vue";
import { onBeforeMount } from "@vue/runtime-core";
export default {
  components: { PlayListTop, PlayListPanel },
  setup() {
    let route = useRoute();
    let musicData = reactive({
      playlist: {
        tracks: [],
      },
    });
    onBeforeMount(async () => {
      await getAxios()
        .get("/playlist/detail?id=" + route.params.id)
        .then((res) => {
          musicData.playlist = res.data.playlist;
        });
    });
    return {
      musicData,
    };
  },
};
</script>

<style lang='less' scoped>
.play-list {
  width: 7.5rem;
  margin-top: 0.4rem;
  color: #fff;
  font-weight: bold;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 7.5rem;
    filter: blur(30px);
    z-index: -1;
    img {
      width: 100%;
    }
  }
}
</style>