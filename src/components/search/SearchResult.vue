<template>
  <div class="search-result">
    <div class="search-header">
      <div class="play-all">
        <span class="t1"> 单曲 </span>
      </div>
      <div class="select">
        <Icon xurl="#icon-show_duoxuan" />
      </div>
    </div>
    <div class="search-music-list">
      <div
        v-for="(music, i) in sResult"
        class="search-music-item"
        :key="music.id"
      >
        <div class="music-info">
          <div class="music-title">{{ music.name }}</div>
          <div class="music-singer">{{ music.ar[0].name }}</div>
        </div>
        <div class="play-icon">
          <div class="play-btn" @click="playMusic(music)">
            <Icon xurl="#icon-bofang" />
          </div>
          <div class="play-menu">
            <Icon xurl="#icon-youcecaidan" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.search-result {
  width: 7.1rem;
  background: #fff;
  margin-top: 0.3rem;
  border-radius: 0.2rem;
  padding: 0.1rem;
  .search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.8rem;
    .t1 {
      height: 0.8rem;
      line-height: 0.4rem;
      padding: 0.2rem;
      font-size: 0.4rem;
      font-weight: bold;
    }
    .icon {
      fill: #000;
    }
  }
  .search-music-list {
    width: 100%;
    max-height: 12rem;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    &:nth-last-child {
      border-bottom: 1px solid rgb(210, 210, 210);
    }
    .search-music-item {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgb(210, 210, 210);
      padding: 0.2rem 0.1rem;
      width: 7rem;
      .music-info {
        font-family: "heiti", "ht", "黑体";
        .music-title {
          color: #000;
          font-size: 0.4rem;
        }
        .music-singer {
          color: rgb(100, 100, 100);
          font-size: 0.3rem;
        }
      }
      .play-icon {
        .play-btn,
        .play-menu {
          display: inline;
          margin: 0 0.1rem;
        }
        .icon {
          margin: calc(50% - 0.5rem) 0;
        }
      }
    }
  }
}
</style>

<script lang="ts">
import Icon from "../Icon.vue";
import { useStore } from "vuex";
import Music from "@/api/music";
export default {
  name: "search-result",
  components: { Icon },
  props: ["sResult"],
  setup() {
    let $store = useStore();
    const playMusic = (item: any) => {
      let music = new Music(
        item.id,
        item.name,
        item.ar[0].name,
        item.al.picUrl
      );
      $store.dispatch("isPlaying", music);
    };
    return { playMusic };
  },
};
</script>