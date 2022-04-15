<template>
  <div class="playlist-top">
    <div class="playlist-nav">
      <div class="left">
        <div class="return-home" @click="returnHome">
          <Icon xurl="#icon-arrow-left-full" />
        </div>
        <span>歌单</span>
      </div>
      <div class="right">
        <Icon xurl="#icon-sousuo" />
        <Icon xurl="#icon-youcecaidan" />
      </div>
    </div>
    <div class="content">
      <div class="cover">
        <span class="play-times"
          >▷ {{ getPlayCount(musicInfo.playCount) }}</span
        >
        <img :src="musicInfo.coverImgUrl" alt="" />
      </div>
      <div class="info">
        <div class="title">{{ musicInfo.name }}</div>
        <div class="author" v-if="musicInfo.creator">
          <img :src="musicInfo.creator.avatarUrl" alt="创建者头像" />
          <span>{{ musicInfo.creator.nickname }}</span>
        </div>
        <div class="intro">{{ musicInfo.description }}</div>
      </div>
    </div>
    <div class="icon-list">
      <div class="icon-item">
        <Icon xurl="#icon-pinglun" />
        <span>{{ getPlayCount(musicInfo.commentCount) }}</span>
      </div>
      <div class="icon-item">
        <Icon xurl="#icon-fenxiang-m" />
        <span>{{ getPlayCount(musicInfo.shareCount) }}</span>
      </div>
      <div class="icon-item">
        <Icon xurl="#icon-iconfontzhizuobiaozhun023146" />
        <span>下载</span>
      </div>
      <div class="icon-item">
        <Icon xurl="#icon-show_duoxuan" />
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Options, Vue } from "vue-class-component";
import { useRouter } from "vue-router";
import Icon from "../Icon.vue";
import getPlayCount from "@/api/parse-count";

class Props {
  musicInfo?: Object;
}

@Options({
  components: { Icon },
})
export default class PlayListTop extends Vue.with(Props) {
  router = useRouter();
  getPlayCount = getPlayCount;
  props = ["musicInfo"];
  returnHome() {
    this.router.back();
  }
}
</script>

<style lang="less" scoped>
.playlist-top {
  width: 7.5rem;
  padding: 0 0.1rem;
  .playlist-nav {
    margin: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.4rem;
    fill: #fff;
    .left {
      display: flex;
      color: #fff;
      :nth-child(n) {
        margin-right: 0.4rem;
      }
    }
    .right {
      display: flex;
      color: #fff;
      :nth-child(n) {
        margin-left: 0.2rem;
      }
    }
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      fill: #fff;
    }
    .return-home {
      width: 0.4rem;
      cursor: pointer;
    }
  }
  .content {
    margin: 0.2rem;
    padding: 0.1rem;
    width: 7.1rem;
    display: flex;
    justify-content: space-between;
    .cover {
      position: relative;
      width: 3rem;
      border-radius: 0.1rem;
      overflow: hidden;
      font-size: 0;
      .play-times {
        font-size: 0.2rem;
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        color: #fff;
      }
      img {
        width: 100%;
      }
    }
    .info {
      padding: 0 0.1rem;
      width: 4rem;
      font-family: "黑体";
      margin-left: 0.1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 0.35rem;
        margin: 0 0 0.2rem 0;
      }
      .author {
        display: flex;
        align-items: center;
        font-size: 0.2rem;
        margin: 0.25rem 0;
        img {
          border-radius: 50%;
          overflow: hidden;
          font-size: 0;
          width: 0.6rem;
        }
        span {
          text-indent: 1em;
        }
      }
      .intro {
        font-size: 0.2rem;
        margin: 0.2rem 0;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 0.8rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: rgb(242, 242, 242);
      }
    }
  }
  .icon-list {
    display: flex;
    justify-content: space-around;
    .icon-item {
      display: flex;
      flex-direction: column;
      .icon {
        fill: #fff;
        width: 0.6rem;
        height: 0.6rem;
      }
      span {
        font-size: 0.3rem;
        text-align: center;
        font-family: "Times New Roman", Times, serif;
        padding-top: 0.1rem;
      }
    }
  }
}
</style>