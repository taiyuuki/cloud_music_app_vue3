<template>
  <FullscreenPlaying
    v-show="isFull"
    :audioData="audioData"
    @back="isFull = !isFull"
    @playPauseAudio="playPauseAudio"
    @jump="jump"
    @move="move"
  />
  <audio
    :src="audioData.audiourl"
    v-if="audioData.id !== 0"
    autoplay
    preload="auto"
    @ended="audioEnded"
    @timeupdate="audioTimeupdate"
    @loadeddata="audioLoadeddata"
    @canplay="audioCanplay"
  ></audio>
  <div class="music-playing-control" v-show="!isFull">
    <div class="cover" :style="ani" @click="switchToFullsreen">
      <img :src="audioData.picUrl" />
    </div>
    <div class="title">
      <div class="marquee">
        {{ audioData.title }} <span v-if="audioData.title">-</span>
        {{ audioData.singer }}
      </div>
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
import Icon from "../Icon.vue";
import FullscreenPlaying from "../playbar/FullscreenPlaying.vue";
import { useStore } from "vuex";
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { getLrc } from "@/api/index";

export default {
  name: "play-music",
  components: { Icon, FullscreenPlaying },
  setup() {
    const COVER_ANI = "animation:coverSpin 10s linear infinite";
    let $store = reactive(useStore());
    let $audio: HTMLAudioElement | null = null;
    let ani = ref(COVER_ANI); // 封面旋转动画
    let isFull = ref(false); // 是否全屏播放
    let isAuto = true; // 是否自动切换歌曲
    let isJump = false; // 是否正在跳转进度条
    let isMove = false; // 是否正在拉动进度条
    const audioData = reactive({
      id: 0,
      audiourl: "",
      playing: false, // 播放状态
      picUrl: "", // 封面
      title: "", // 歌名
      singer: "", // 歌手
      duration: 0, // 音频总时长
      currentTime: 0, // 当前播放的位置
      currentIndex: 0, // 当前歌词
      trans: 2,
      layric: [] as any[], //歌词
    });

    // 监视切歌
    watch(
      () => $store.state.playCurrentMusic,
      () => {
        audioData.id = $store.state.playCurrentMusic.id;
        audioData.audiourl = `https://music.163.com/song/media/outer/url?id=${$store.state.playCurrentMusic.id}`;
        audioData.playing = $store.state.isPlaying;
        audioData.picUrl = $store.state.playCurrentMusic.picUrl;
        audioData.title = $store.state.playCurrentMusic.title;
        audioData.singer = $store.state.playCurrentMusic.singer;
        audioData.currentIndex = 0;
        audioData.trans = 0;
      },
      { immediate: true }
    );

    /**
     * 以下是对音频的操作
     */

    // 转换时间格式
    const transTime = (time: number): string => {
      const addZero = (n: number): string => {
        if (n < 10) {
          return "0" + n;
        } else {
          return "" + n;
        }
      };
      let secend = Math.floor(time);
      let minute = Math.floor(secend / 60);
      return addZero(minute) + ":" + addZero(secend - minute * 60);
    };

    // 音频播放结束
    const audioEnded = () => {
      audioData.playing = false;
      ani.value = "";
      audioData.currentTime = 0;
      audioData.currentIndex = 0;
      audioData.trans = 0;
      if (isAuto) {
        $store.dispatch("isPlaying");
        audioPlay();
        ani.value = COVER_ANI;
      }
    };

    // 播放进度：表示正在播放，currentTime在更新
    const audioTimeupdate = (e: any) => {
      audioData.currentTime = e.target.currentTime;
      for (let i = 0; i < audioData.layric.length; i++) {
        if (
          audioData.layric[i].start < audioData.currentTime &&
          audioData.layric[i].end > audioData.currentTime
        ) {
          if (audioData.currentIndex !== i) {
            audioData.currentIndex = i;
            if (audioData.layric[audioData.currentIndex].start && !isJump) {
              audioData.trans =
                audioData.layric[audioData.currentIndex].end -
                audioData.layric[audioData.currentIndex].start;
            }
          }
          break;
        }
      }
      if (!isMove) {
        $store.state.musicCurrentTime = transTime(audioData.currentTime);
        $store.state.musicProgress =
          (audioData.currentTime * 100) / audioData.duration;
      }
    };

    // 当媒体音频第一帧加载完成时
    const audioLoadeddata = (e: any) => {
      $audio = e.target;
      audioData.duration = e.target.duration;
      $store.state.musicDuration = transTime(audioData.duration);
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
      isAuto = false;
      if (!audioData.playing) {
        audioPlay();
        ani.value = `animation:coverSpin 10s linear infinite`;
      } else {
        audioPause();
        ani.value =
          "animation:coverSpin 10s linear infinite;animation-play-state: paused";
      }
      $store.commit("playPause", audioData.playing);
      isAuto = true;
    };

    // 全屏
    const switchToFullsreen = () => {
      isFull.value = true;
    };

    const getTimeStamp = (time: string): number => {
      let result =
        parseInt(time.slice(0, time.lastIndexOf(":"))) * 60 +
        parseFloat(time.slice(time.lastIndexOf(":") + 1));
      return result;
    };

    // 获取歌词
    const audioCanplay = () => {
      getLrc(audioData.id).then((data) => {
        audioData.layric = data.lrc.lyric.split(/\n/g).map((item: any) => {
          let sliceIndex = item.lastIndexOf("]");
          return {
            start: getTimeStamp(item.slice(1, sliceIndex)),
            lrc: item.slice(sliceIndex + 1) || "<br/>",
          };
        });
        for (let i = 0; i < audioData.layric.length; i++) {
          if (audioData.layric[i + 1].start) {
            audioData.layric[i].end = audioData.layric[i + 1].start;
          } else {
            audioData.layric[i].end = audioData.duration;
            break;
          }
        }
      });
    };

    // 进度条跳转
    const jump = (p: number) => {
      isJump = true;
      if ($audio) {
        $audio.currentTime = p;
      }
      audioData.trans = 0;
      setTimeout(() => {
        isJump = false;
      }, 200);
      isMove = false;
      window.onmousemove = null;
      window.onmouseup = null;
    };

    // 拉进度条
    const move = (p: number) => {
      isMove = true;
      $store.state.musicProgress = (p * 100) / audioData.duration;
      $store.state.musicCurrentTime = transTime(p);
    };

    return {
      isFull,
      audioData,
      audioEnded,
      audioTimeupdate,
      audioLoadeddata,
      playPauseAudio,
      ani,
      jump,
      move,
      switchToFullsreen,
      audioCanplay,
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
  bottom: 1.4rem;
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