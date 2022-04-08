<template>
  <div class="home">
    <div class="nav">
      <div class="list-btn">
        <Icon xurl="#icon-liebiaoshitucaidan" />
      </div>
      <div class="tag-list">
        <ul>
          <li>我的</li>
          <li>发现</li>
          <li>云村</li>
          <li>视频</li>
        </ul>
      </div>
      <div class="search">
        <Icon xurl="#icon-sousuoxiao" />
      </div>
    </div>
    <Swiper />
    <IconList />
    <MusicList />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Swiper from "../components/Swiper.vue";
import IconList from "../components/IconList.vue";
import MusicList from "../components/MusicList.vue";
import Icon from "../components/Icon.vue";

@Options({
  components: { Swiper, IconList, MusicList, Icon },
})
export default class Home extends Vue {}
</script>

<style lang="less">
.home {
  width: 7.5rem;
  height: 3.75rem;
  margin-top: 0.4rem;
  .nav {
    width: 7.5rem;
    height: 0.8rem;
    line-height: 0.8rem;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    .tag-list ul {
      width: 5rem;
      display: flex;
      justify-content: space-between;
      height: 100%;
      line-height: 0.5rem;
      li {
        list-style-type: none;
        font-size: 0.3rem;
      }
    }
  }
}
</style>
