<template>
  <div class="play-list-panel" @scroll="onScrollAction">
    <div class="list-top">
      <div class="play-all">
        <Icon xurl="#icon-bofang" />
        <span class="t1">
          播放全部
          <span class="t2">(共{{ musicInfo.tracks.length }}首)</span>
        </span>
      </div>
      <div class="collect">+ 收藏({{ musicInfo.subscribedCount }})</div>
    </div>
    <div class="list-item">
      <div class="item" v-for="(item, i) in musicInfo.tracks" :key="item.id">
        <div class="left">
          <div class="music-count">{{ ++i }}</div>
          <div class="musics">
            <div class="title">{{ item.name }}</div>
            <div class="singer">{{ item.ar[0].name }}</div>
          </div>
        </div>
        <div class="right">
          <div class="play-btn" @click="playMisic(item)">
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

<script lang="ts">
import Icon from "../Icon.vue";
import { useStore } from "vuex";
import { reactive } from "@vue/runtime-core";
import Music from "@/api/music";

export default {
  name: "play-list-panel",
  props: ["musicInfo"],
  components: { Icon },
  setup() {
    let $store = reactive(Object.create(null));
    $store = useStore();
    function playMisic(item: any): void {
      let music = new Music(
        item.id,
        item.name,
        item.ar[0].name,
        item.al.picUrl
      );
      $store.dispatch("isPlaying", music);
    }

    const onScrollAction = (e: any) => {
      console.log(e.target);
    };
    return {
      playMisic,
      onScrollAction,
    };
  },
};
</script>

<style lang="less">
.play-list-panel {
  margin: 0.2rem 0 0 0;
  width: 7.5rem;
  height: calc(100vh - 8rem);
  background-color: #fff;
  padding: 0.2rem;
  border-radius: 0.2rem;
  color: #000;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .list-top {
    display: flex;
    justify-content: space-between;
    .play-all {
      display: flex;
      align-items: left;
      .t1 {
        height: 0.5rem;
        line-height: 0.5rem;
        margin: 0 0.1rem;
        font-size: 0.3rem;
        .t2 {
          font-size: 0.2rem;
          height: 0.5rem;
          line-height: 0.5rem;
          color: rgb(110, 110, 110);
        }
      }
    }
    .collect {
      font-size: 0.16rem;
      border-radius: 0.25rem;
      height: 0.5rem;
      line-height: 0.3rem;
      background-color: rgb(255, 0, 119);
      color: #fff;
      padding: 0.1rem;
    }
  }
  .list-item {
    margin: 0.2rem 0 0 0;
    width: 7.5rem;
    background-color: #fff;
    padding: 0.2rem;
    border-radius: 0.2rem;
    color: #000;
    .item {
      display: flex;
      height: 0.5rem;
      justify-content: space-between;
      text-overflow: ellipsis;
      margin: 0.2rem;
      .left {
        display: flex;
        .music-count {
          width: 0.5rem;
          height: 0.5rem;
          line-height: 0.5rem;
          color: rgb(110, 110, 110);
        }
        .musics {
          flex-direction: row;
          .title {
            font-size: 0.28rem;
            font-family: "黑体";
            font-weight: bold;
            height: 0.3rem;
            line-height: 0.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .singer {
            font-size: 0.16rem;
            color: rgb(110, 110, 110);
            font-family: "黑体";
            height: 0.2rem;
            line-height: 0.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .right {
        display: flex;
        justify-content: space-around;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
        .play-btn,
        .play-menu {
          height: 0.5rem;
          line-height: 0.5rem;
          margin: 0 0.1rem;
          cursor: pointer;
        }
      }
    }
  }
}
</style>