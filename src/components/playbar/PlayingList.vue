<template>
  <div class="playing-list-bg" @click="hiddenList">
    <transition name="btts" appear>
      <div class="playing-list-container">
        <div class="playing-list-top">
          当前播放<span v-if="store.state.musicPlayingList.length > 0"
            >({{ store.state.musicPlayingList.length }})</span
          >
          <div class="loop-type" @click.stop="switchPlayingType">
            <div v-show="store.state.playingType === 0">
              <Icon xurl="#icon-24gl-repeat2" /> 列表循环
            </div>
            <div v-show="store.state.playingType === 1">
              <Icon xurl="#icon-24gl-repeatOnce2" /> 单曲循环
            </div>
            <div v-show="store.state.playingType === 2">
              <Icon xurl="#icon-24gl-shuffle" /> 随机播放
            </div>
          </div>
        </div>
        <div
          class="playing-list"
          v-if="store.state.musicPlayingList.length > 0"
        >
          <div
            v-for="(item, i) in store.state.musicPlayingList"
            class="playing-list-item"
            @click="switchCurrentMusic(i)"
          >
            <div
              :class="{
                'playing-list-title': true,
                isplaying: store.state.playIndex === i,
              }"
            >
              <Icon
                v-if="store.state.playIndex === i"
                xurl="#icon-zhengzaibofang"
              />
              {{ item.title
              }}<span class="playing-list-singer"> - {{ item.singer }}</span>
            </div>
            <div class="remove-list-item" @click.stop="removeCurrentMusic(i)">
              <Icon xurl="#icon-cancel-1-copy" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import Icon from "@/components/Icon.vue";
export default {
  name: "playing-list",
  components: { Icon },
  emits: ["hiddenList"],
  setup(_: any, context: any) {
    let store = useStore();
    // 隐藏播放列表
    const hiddenList = (e: any): void => {
      if (e.target.className === "playing-list-bg") {
        context.emit("hiddenList");
      }
    };
    // 切换播放列表中的歌曲
    const switchCurrentMusic = (index: number): void => {
      store.commit("switchCurrentMusic", index);
    };
    // 移除播放列表中的歌曲
    const removeCurrentMusic = (index: number): void => {
      store.dispatch("removeCurrentMusic", index);
    };
    // 切换播放模式
    const switchPlayingType = (): void => {
      store.dispatch("switchPlayingType");
    };
    return {
      store,
      hiddenList,
      switchCurrentMusic,
      removeCurrentMusic,
      switchPlayingType,
    };
  },
};
</script>

<style lang="less">
.playing-list-bg {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 5;
}
.playing-list-container {
  width: 7.1rem;
  height: 60vh;
  position: absolute;
  bottom: 0.2rem;
  left: 0.2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  .playing-list-top {
    font-family: "微软雅黑", "ht", "heiti", "黑体";
    color: #000;
    height: 1.5rem;
    font-size: 0.4rem;
    padding: 0.2rem;
    span {
      font-size: 0.25rem;
      color: rgb(115, 115, 115);
    }
    .loop-type {
      margin: 0.2rem 0;
      font-size: 0.3rem;
      cursor: pointer;
      .icon {
        fill: rgb(115, 115, 115);
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
  .playing-list {
    height: calc(60vh - 1rem);
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    padding: 0.1rem;
    .playing-list-item {
      display: flex;
      height: 0.8rem;
      justify-content: space-between;
      font-family: "微软雅黑", "ht", "heiti", "黑体";
      padding: 0.1rem;
      cursor: pointer;
      .playing-list-title {
        font-size: 0.3rem;
      }
      .playing-list-singer {
        font-size: 0.25rem;
        color: rgb(115, 115, 115);
      }
      .remove-list-item {
        .icon {
          fill: rgb(115, 115, 115);
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .isplaying {
        color: rgb(255, 0, 119);
        .icon {
          fill: rgb(255, 0, 119);
          width: 0.3rem;
          height: 0.3rem;
        }
        .playing-list-singer {
          color: rgb(255, 0, 119);
        }
      }
    }
  }
}
</style>