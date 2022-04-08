<template>
  <FullscreenPlaying
    v-show="isFull"
    :audioData="audioData"
    @back="isFull = !isFull"
  />
  <audio
    :src="audioData.audiourl"
    v-if="audioData.id !== 0"
    autoplay
    preload="auto"
    @ended="audioEnded"
    @timeupdate="audioTimeupdate"
    @loadeddata="audioLoadeddata"
  ></audio>
  <div class="music-playing-control" v-show="!isFull">
    <div class="cover" :style="ani" @click="switchToFullsreen">
      <img :src="audioData.picUrl" />
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
    <div class="playing-btn" @click="playPauseAudio">
      <Icon v-show="!audioData.playing" xurl="#icon-bofang" />
      <Icon v-show="audioData.playing" xurl="#icon-zanting" />
    </div>
    <div class="playing-list">
      <Icon xurl="#icon-24gf-playlistMusic5" />
    </div>
  </div>
</template>

<script lang="ts">
import Icon from "./Icon.vue";
import FullscreenPlaying from "./FullscreenPlaying.vue";
import { useStore } from "vuex";
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  name: "play-music",
  components: { Icon, FullscreenPlaying },
  setup() {
    let $store = reactive(useStore());
    let $audio: HTMLAudioElement | null = null;
    let ani = ref(`animation:coverSpin 10s linear infinite`); // 封面旋转动画
    let isFull = ref(false); // 是否全屏播放
    const audioData = reactive({
      id: 0,
      audiourl: "",
      playing: false, // 播放状态
      picUrl: "", // 封面
      title: "", // 歌名
      singer: "", // 歌手
      duration: 0, // 音频总时长
      currentTime: 0, // 当前播放的位置
    });

    // 监视切歌
    watch(
      $store,
      () => {
        audioData.id = $store.state.playCurrentMusic.id;
        audioData.audiourl = `https://music.163.com/song/media/outer/url?id=${$store.state.playCurrentMusic.id}`;
        audioData.playing = $store.state.isPlaying;
        audioData.picUrl = $store.state.playCurrentMusic.picUrl;
        audioData.title = $store.state.playCurrentMusic.title;
        audioData.singer = $store.state.playCurrentMusic.singer;
        if (audioData.playing) {
          ani.value = `animation:coverSpin 10s linear infinite`;
        }
      },
      { immediate: true }
    );

    /**
     * 以下是对音频的操作
     */

    // 音频播放结束
    const audioEnded = () => {
      audioData.playing = false;
      ani.value = "";
    };

    // 播放进度：表示正在播放，currentTime在更新
    const audioTimeupdate = (e: any) => {
      audioData.currentTime = e.target.currentTime;
      //处理
    };

    // 当媒体音频第一帧加载完成时
    const audioLoadeddata = (e: any) => {
      $audio = e.target;
      audioData.duration = e.target.duration;
    };

    // 播放
    function audioPlay() {
      if ($audio) {
        $audio.play();
        audioData.playing = true;
      }
    }

    // 暂停播放
    function audioPause() {
      if ($audio) {
        $audio.pause();
        audioData.playing = false;
      }
    }
    // 播放或暂停音频
    const playPauseAudio = () => {
      if (!audioData.playing) {
        audioPlay();
        ani.value = `animation:coverSpin 10s linear infinite`;
      } else {
        audioPause();
        ani.value = "";
      }
      $store.commit("playPause", audioData.playing);
    };

    // 全屏
    const switchToFullsreen = () => {
      isFull.value = true;
    };

    return {
      isFull,
      audioData,
      audioEnded,
      audioTimeupdate,
      audioLoadeddata,
      playPauseAudio,
      ani,
      switchToFullsreen,
    };
  },
};
</script>

<style lang="less">
@keyframes coverSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes textMarquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(4.4375rem - 100%));
  }
}

.music-playing-control {
  position: absolute;
  bottom: 0;
  left: 0.2rem;
  width: 7.1rem;
  height: 1rem;
  background-color: rgb(255, 0, 119);
  border-radius: 1rem;
  display: flex;
  .cover {
    position: relative;
    flex: 1;
    height: 1rem;
    line-height: 1rem;
    font-size: 0;
    cursor: pointer;
    img {
      border-radius: 50%;
      overflow: hidden;
      height: 100%;
    }
  }
  .title {
    flex: 5;
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1rem;
    position: relative;
    overflow: hidden;
    color: #fff;
    font-weight: bold;
    font-family: "Courier New", Courier, monospace;
    .marquee {
      white-space: nowrap;
      position: absolute;
      animation: textMarquee 5s linear infinite alternate;
    }
  }
  .playing-btn,
  .playing-list {
    flex: 1;
    height: 1rem;
    line-height: 1rem;
    padding: 0.2rem 0;
    cursor: pointer;
  }
  .icon {
    width: 0.6rem;
    height: 0.6rem;
    fill: #fff;
  }
}
</style>