<template>
  <div class="nav">
    <div class="list-btn">
      <Icon xurl="#icon-liebiaoshitucaidan" />
    </div>
    <div class="search" @click="searchMusicBtn">
      <Icon xurl="#icon-sousuoxiao" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Icon from "@/components/Icon.vue";
import { useRouter } from "vue-router";

@Options({
  components: { Icon },
})
export default class TopBar extends Vue {
  router = useRouter();
  searchMusicBtn() {
    this.router.push({
      name: "search",
    });
  }
}
</script>

<style lang="less">
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
  .search {
    cursor: pointer;
  }
}
</style>