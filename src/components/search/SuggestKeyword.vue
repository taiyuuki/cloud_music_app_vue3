<template>
  <div class="suggest-list">
    <div
      v-for="(item, i) in suggestList"
      class="suggest-item"
      @click="search(item.keyword)"
    >
      <div class="type">
        <Icon v-if="item.type === 1" xurl="#icon-sousuo" />
        <Icon v-if="item.type === 0" xurl="#icon-lishi" />
      </div>
      <p class="keyword">{{ item.keyword }}</p>
    </div>
  </div>
</template>

<style lang="less">
.suggest-list {
  width: 100%;
  .suggest-item {
    display: flex;
    height: 0.6rem;
    justify-content: left;
    .type {
      height: 0.6rem;
      padding: 0.2rem 0;
      width: 0.3rem;
      .icon {
        fill: rgb(115, 115, 115);
        width: 0.2rem;
        height: 0.2rem;
      }
    }
    .keyword {
      flex: 1;
      font-family: "heiti", "ht", "黑体";
      font-size: 0.2rem;
      height: 0.6rem;
      line-height: 0.2rem;
      padding: 0.2rem 0;
      border-bottom: 1px solid rgb(210, 210, 210);
      cursor: pointer;
    }
  }
}
</style>

<script lang="ts">
import Icon from "../Icon.vue";
export default {
  name: "suggest-keyword",
  components: { Icon },
  props: ["suggestList"],
  emits: ["search"],
  setup(_: any, context: any) {
    const search = (keyword: string) => {
      context.emit("search", keyword);
    };
    return { search };
  },
};
</script>