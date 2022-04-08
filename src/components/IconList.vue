<template>
  <div class="icon-list">
    <div
      class="item"
      v-for="item in ballList"
      :key="item.id"
      @click="toggleToList(item.name)"
    >
      <div class="icon">
        <img :src="item.iconUrl" :alt="item.name" />
      </div>
      <div class="ball-text">{{ item.name }}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { reactive } from "@vue/reactivity";
import getAxios from "../hook/get-axios";
export default {
  name: "icon-list",
  setup() {
    let ballList = reactive([]);
    getAxios()
      .get("/homepage/dragon/ball")
      .then((res) => {
        res.data.data.forEach((item: never) => {
          ballList.push(item);
        });
      });
    function toggleToList(name: string) {
      console.log(name);
    }
    return {
      ballList,
      toggleToList,
    };
  },
};
</script>

<style lang='less' scoped>
.icon-list {
  width: 7.5rem;
  height: 2.4rem;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .item {
    height: 100%;
    margin: 0.1rem;
    cursor: pointer;
    .icon {
      background-color: rgb(255, 0, 119);
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
      font-size: 0;
      img {
        width: 100%;
      }
    }
    .ball-text {
      height: 0.2rem;
      text-align: center;
      margin-top: 0.1rem;
      font-size: 0.28rem;
      font-weight: bold;
    }
  }
}
</style>