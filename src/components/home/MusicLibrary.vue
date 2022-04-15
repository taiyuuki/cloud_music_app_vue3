<template>
  <div class="music-list">
    <div class="list-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="list">
      <swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="0"
        :pagination="{ clickable: true, type: pType }"
        class="swiper-container"
      >
        <swiper-slide v-for="item in musicList" :key="item.id"
          ><div class="item-box" @click="toggleToMusicList(item.id)">
            <span class="play-times">▷ {{ getPlayCount(item.playCount) }}</span>
            <div class="images"><img :src="item.picUrl" alt="" /></div>

            <span class="des">{{ item.name }}</span>
          </div></swiper-slide
        >
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { getPersonalized } from "@/api/index";

import { reactive } from "vue";
import { useRouter } from "vue-router";
import getPlayCount from "@/api/parse-count";
export default {
  name: "music-list",
  components: { Swiper, SwiperSlide },
  setup() {
    let musicList = reactive([]);
    let router = useRouter();
    getPersonalized(10).then((data) => {
      data.result.forEach((item: never) => {
        musicList.push(item);
      });
    });

    function toggleToMusicList(id: number) {
      router.push({
        name: "playlist",
        params: {
          id,
        },
      });
    }
    return {
      modules: [Pagination, A11y],
      musicList,
      getPlayCount,
      toggleToMusicList,
      pType: "none",
    };
  },
};
</script>

<style lang='less' scoped>
.music-list {
  width: 7.5rem;
  padding: 0.2rem;
  .list-top {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid rgb(100, 100, 100);
      border-radius: 0.2rem;
      font-size: 0.2rem;
      line-height: 0.4rem;
      height: 0.4rem;
      padding: 0 0.1rem;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
  .list {
    width: 100%;
    position: relative;
    .item-box {
      cursor: pointer;
      width: 100%;
      height: 3.2rem;
      .play-times {
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
        color: #fff;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        text-shadow: 1px 1px 1px #000;
      }
      .images {
        border-radius: 0.2rem;
        margin: 0.1rem;
        overflow: hidden;
        font-size: 0;
        img {
          width: 100%;
        }
      }
      .des {
        font-size: 0.2rem;
        margin: 0.1rem;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        line-height: 0.3rem;
      }
    }
  }
}
</style>