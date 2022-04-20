<template>
  <div class="fullscreen-playing">
    <div class="bg" :style="`background-image:url(${audioData.picUrl})`"></div>
    <div class="playing-top">
      <div class="return" @click="back">
        <Icon xurl="#icon-xiajiantou" />
      </div>
      <div class="title">
        <div class="marquee">
          {{ audioData.title }} <span v-if="audioData.title">-</span>
          {{ audioData.singer }}
        </div>
      </div>
      <div class="share">
        <Icon xurl="#icon-fenxiang-m" />
      </div>
    </div>
    <div class="cover-and-lrc">
      <div v-show="coverMode">
        <div class="needel" :style="deg">
          <img src="@/assets/needle-ab.png" alt="" />
        </div>
        <div class="cover" :style="ani">
          <img class="cover-pic" :src="audioData.picUrl" />
          <img class="cover-back" src="@/assets/disc-plus.png" />
        </div>
      </div>
      <div class="lrc" @click="switchShowMode" :style="show">
        <div
          class="scroll-bar"
          :style="`transform: translateY(${
            lrcBarHeight / 2 - audioData.currentIndex * 0.5 - 0.5
          }rem);transition:${audioData.trans}s ease-out`"
        >
          <template v-for="(item, i) in audioData.layric" :key="item.id">
            <p
              v-html="item.lrc"
              :class="{
                'lrc-all': true,
                'lrc-show': audioData.currentIndex === i,
              }"
            ></p>
          </template>
        </div>
      </div>
    </div>
    <Slider @jump="jump" @move="move" />
    <div class="control-panel">
      <div class="progress-bar">
        <div class="start"></div>
        <div class="bar"></div>
        <div class="end"></div>
      </div>
      <div class="control-btn">
        <div class="loop" @click="switchPlayingType">
          <Icon
            v-show="store.state.playingType === 0"
            xurl="#icon-24gl-repeat2"
          />
          <Icon
            v-show="store.state.playingType === 1"
            xurl="#icon-24gl-repeatOnce2"
          />
          <Icon
            v-show="store.state.playingType === 2"
            xurl="#icon-24gl-shuffle"
          />
        </div>
        <div class="pre-music" @click="switchMusic(-1)">
          <Icon xurl="#icon-shangyiqu" />
        </div>
        <div class="play-music" @click="playPauseAudio">
          <Icon v-show="!audioData.playing" xurl="#icon-bofang" />
          <Icon v-show="audioData.playing" xurl="#icon-zanting" />
        </div>
        <div class="next-music" @click="switchMusic(1)">
          <Icon xurl="#icon-xiayiqu" />
        </div>
        <div class="playing-music-list" @click.stop="showPlayingList">
          <Icon xurl="#icon-24gf-playlistMusic5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, onUpdated, ref } from "@vue/runtime-core";
import Icon from "../Icon.vue";
import Slider from "./Slider.vue";
import { useStore } from "vuex";
import { reactive } from "vue";

export default {
  name: "fullscreen-playing",
  components: { Icon, Slider },
  props: ["audioData"],
  emits: ["back", "playPauseAudio", "jump", "move", "showPlayingList"],
  setup(props: any, context: any) {
    let store = reactive(Object.create(null));
    let coverMode = ref(true); // 显示模式：是否显示封面
    let lrcBarHeight = ref(2.5); // 歌词面板的高度
    let show = ref(``); // 歌词显示动画属性
    let ani = ref(""); // 唱片旋转动画属性
    let deg = ref("transform: rotate(-35deg)"); // 唱片磁针动画
    store = useStore();

    // 返回
    const back = (): void => {
      context.emit("back");
    };

    // 切换音乐
    const switchMusic = (i: number): void => {
      store.commit("switchMusic", i);
    };

    // 切换播放模式
    const switchPlayingType = (): void => {
      store.dispatch("switchPlayingType");
    };

    // 切换显示模式
    const switchShowMode = (): void => {
      props.audioData.trans = 0;
      coverMode.value = !coverMode.value;
      if (coverMode.value) {
        lrcBarHeight.value = 3;
        show.value = "";
      } else {
        lrcBarHeight.value = 9;
        show.value = `height:${lrcBarHeight.value + 3}rem;top: 0rem`;
      }
    };

    // 跳转进度条
    const jump = (p: number): void => {
      let progress = p * props.audioData.duration;
      context.emit("jump", progress);
    };

    // 移动进度条
    const move = (p: number): void => {
      let progress = p * props.audioData.duration;
      context.emit("move", progress);
    };

    // 播放、暂停唱片旋转动画
    const coverAnimation = (): void => {
      if (props.audioData.playing) {
        ani.value = `animation:coverSpin 10s linear infinite`;
        deg.value = "transform: rotate(-5deg)";
      } else {
        ani.value =
          "animation:coverSpin 10s linear infinite;animation-play-state: paused";
        deg.value = "transform: rotate(-35deg)";
      }
    };

    // 加载动画
    onMounted(() => {
      coverAnimation();
    });

    // 更新动画
    onUpdated(() => {
      coverAnimation();
    });

    // 播放、暂停
    const playPauseAudio = () => {
      context.emit("playPauseAudio");
    };

    // 显示播放列表
    const showPlayingList = () => {
      context.emit("showPlayingList");
    };

    return {
      back,
      store,
      ani,
      deg,
      jump,
      move,
      playPauseAudio,
      switchMusic,
      switchPlayingType,
      lrcBarHeight,
      show,
      switchShowMode,
      coverMode,
      showPlayingList,
    };
  },
};
</script>

<style lang="less">
@keyframes textMarqueeFull {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(5.325rem - 100%));
  }
}
.fullscreen-playing {
  width: 100vw;
  height: 100vh;
  background-color: rgb(81, 81, 81);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  .bg {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-size: auto 100%;
    background-position: center;
    filter: blur(50px);
    top: 0;
    left: 0;
    z-index: -1;
  }
  .playing-top {
    display: flex;
    justify-content: space-between;
    width: 7.5rem;
    padding: 0.2rem;
    margin-top: 0.1rem;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: #fff;
    }
    .return {
      flex: 1;
      cursor: pointer;
      text-align: center;
    }
    .title {
      flex: 6;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.4rem;
      position: relative;
      overflow: hidden;
      color: #fff;
      font-weight: bold;
      font-family: "Courier New", Courier, monospace;
      .marquee {
        white-space: nowrap;
        position: absolute;
        animation: textMarqueeFull 5s linear infinite alternate;
      }
    }
    .share {
      flex: 1;
      cursor: pointer;
      text-align: center;
    }
  }
  .cover-and-lrc {
    position: relative;
    width: 7.5rem;
    height: 12rem;
    top: 0;
    left: 0;
    .needel {
      position: absolute;
      top: 0.5rem;
      left: 3.5rem;
      width: 2.5rem;
      transform: rotate(-35deg);
      transform-origin: 0.3rem 0.3rem;
      transition: all 1s;
      z-index: 2;
      img {
        width: 2rem;
      }
    }
    .cover {
      position: relative;
      top: 2rem;
      left: 0.5rem;
      width: 6.5rem;
      height: 6.5rem;
      border-radius: 50%;
      overflow: hidden;
      .cover-pic {
        position: absolute;
        left: calc(50% - 2rem);
        top: calc(50% - 2rem);
        width: 4rem;
        font-size: 0;
      }
      .cover-back {
        position: absolute;
        left: calc(50% - 3.25rem);
        top: calc(50% - 3.25rem);
        width: 6.5rem;
        font-size: 0;
      }
    }
    .lrc {
      width: 7.1rem;
      height: 3rem;
      margin: 0.2rem;
      font-size: 0.3rem;
      line-height: 0.5rem;
      color: rgb(108, 108, 108);
      text-align: center;
      position: relative;
      overflow: hidden;
      top: 2rem;
      cursor: pointer;
      .scroll-bar {
        width: 100%;
        line-height: 0.5rem;
        transition: 2s linear;
        position: absolute;
        // top: calc(50% - 0.25rem);
        transform: translateY(1.25rem);
      }
      .lrc-all {
        font-family: "微软雅黑", "heiti", "ht", "黑体";
        white-space: nowrap;
        color: rgb(211, 211, 211);
        text-shadow: 0px 0px 3px rgb(0, 0, 0);
        transition: 0.8s ease-in;
        font-weight: bold;
      }
      .lrc-show {
        color: #fff;
        text-shadow: 0px 0px 3px rgb(0, 0, 0);
        transition: 0.8s ease-out;
      }
    }
  }
  .control-panel {
    width: 7.1rem;
    margin: 0.2rem;
    height: 1rem;
    line-height: 1rem;
    position: relative;
    top: 0.2rem;
    left: 0;
    .control-btn {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 1rem;
      line-height: 1rem;
      .loop,
      .pre-music,
      .next-music,
      .playing-music-list {
        height: 1rem;
        line-height: 1rem;
        cursor: pointer;
        position: relative;
        top: 0.2rem;
        .icon {
          fill: #fff;
          width: 0.6rem;
          height: 0.6rem;
        }
      }
      .play-music {
        line-height: 1rem;
        height: 1rem;
        cursor: pointer;
        .icon {
          fill: #fff;
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }
}
</style>