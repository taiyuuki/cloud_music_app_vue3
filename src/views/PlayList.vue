<template>
  <div class="play-list">
    <img class="bg" :src="musicData.playlist.coverImgUrl" />
    <PlayListTop :musicInfo="musicData.playlist" />
    <PlayListPanel :musicInfo="musicData.playlist" />
  </div>
</template>

<script lang='ts'>
import { reactive } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { getPlayList } from "@/api/index";
import PlayListTop from "@/components/playlist/PlayListTop.vue";
import PlayListPanel from "@/components/playlist/PlayListPanel.vue";
import { onBeforeMount } from "@vue/runtime-core";
import { getLS } from "@/api/storage";
export default {
  components: { PlayListTop, PlayListPanel },
  setup() {
    const COOKIE = "cookie";
    let route = useRoute();
    let musicData = reactive({
      playlist: {
        tracks: [],
      },
    });
    onBeforeMount(async () => {
      if (getLS(COOKIE)) {
        await getPlayList(<string>route.params.id, getLS(COOKIE)).then(
          (data) => {
            // musicData.playlist = data.songs;
            musicData.playlist = data.playlist;
            // console.log(data.songs);
          }
        );
      } else {
        await getPlayList(<string>route.params.id).then(
          (data) => {
            musicData.playlist = data.playlist;
          },
          () => {
            useRouter().push("/login");
          }
        );
      }
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