<template>
  <div class="fullscreen-playing">
    <div class="bg" :style="`background-image:url(${audioData.picUrl})`"></div>
    <div class="playing-top">
      <div class="return" @click="back">
        <Icon xurl="#icon-arrow-left-full" />
      </div>
      <div class="title">
        <!-- <marquee
          behavior="alternate"
          direction="left"
          loop
          scrollamount="1"
          scrolldelay="20"
        >
          {{ audioData.title }} - {{ audioData.singer }}
        </marquee> -->
        <div class="marquee">{{ audioData.title }} {{ audioData.singer }}</div>
      </div>
      <div class="share">
        <Icon xurl="#icon-fenxiang-m" />
      </div>
    </div>
    <div class="cover-and-lrc">
      <div class="needel" :style="deg">
        <img src="../assets/needle-ab.png" alt="" />
      </div>
      <div class="cover" :style="ani">
        <img class="cover-pic" :src="audioData.picUrl" />
        <img class="cover-back" src="../assets/disc-plus.png" />
      </div>
      <div class="lrc"></div>
    </div>
    <div class="control-panel">
      <div class="progress-bar">
        <div class="start"></div>
        <div class="bar"></div>
        <div class="end"></div>
      </div>
      <div class="control-btn">
        <div class="loop">
          <Icon xurl="#icon-24gl-repeatOnce2" />
        </div>
        <div class="pre-music">
          <Icon xurl="#icon-shangyiqu" />
        </div>
        <div class="play-music">
          <Icon xurl="#icon-bofang" />
        </div>
        <div class="next-music">
          <Icon xurl="#icon-xiayiqu" />
        </div>
        <div class="playing-music-list">
          <Icon xurl="#icon-24gf-playlistMusic5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "@vue/runtime-core";
import Icon from "./Icon.vue";

export default {
  name: "fullscreen-playing",
  components: { Icon },
  props: ["audioData"],
  emits: ["back"],
  setup(props: any, context: any) {
    const back = () => {
      context.emit("back");
    };
    let ani = ref("");
    let deg = ref("transform: rotate(-15deg)");
    watch(props, () => {
      if (props.audioData.playing) {
        ani.value = `animation:coverSpin 10s linear infinite`;
        deg.value = "transform: rotate(0deg)";
      } else {
        ani.value = "";
        deg.value = "transform: rotate(-15deg)";
      }
    });
    return { back, ani, deg };
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
  background-color: rgb(114, 113, 113);
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
    width: 7.1rem;
    margin: 0.2rem;
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
      font-size: 0.3rem;
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
    top: 0;
    left: 0;
    .needel {
      position: absolute;
      top: 0.5rem;
      left: 3.5rem;
      width: 2.5rem;
      transform: rotate(-15deg);
      transform-origin: 0.3rem 0.3rem;
      transition: all 1s;
      z-index: 2;
      img {
        width: 2rem;
      }
    }
    .cover {
      position: relative;
      top: 2.5rem;
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
  }
  .control-panel {
    width: 7.1rem;
    margin: 0.1rem;
    position: relative;
    top: 4.4rem;
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
        height: 0.6rem;
        line-height: 0.6rem;
        .icon {
          fill: #fff;
          width: 0.6rem;
          height: 0.6rem;
        }
      }
      .play-music {
        line-height: 1rem;
        height: 1rem;
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