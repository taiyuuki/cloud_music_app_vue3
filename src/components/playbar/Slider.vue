<template>
  <div class="slider">
    <div class="current-time">{{ store.state.musicCurrentTime }}</div>
    <div class="slider-bar" @click.stop="jump" @mousedown.stop="moveSlider">
      <div class="slider-back"></div>
      <div
        class="slider-forword"
        :style="`width:${store.state.musicProgress}%`"
      ></div>
      <div
        class="slider-item"
        :style="`left:${store.state.musicProgress - 1}%`"
      ></div>
    </div>
    <div class="end-time">{{ store.state.musicDuration }}</div>
  </div>
</template>

<style lang="less">
.slider {
  width: 7.1rem;
  margin: 0 0.2rem;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  .current-time,
  .end-time {
    flex: 1;
    font-size: 0.2rem;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    height: 0.4rem;
    line-height: 0.4rem;
    vertical-align: middle;
    margin: 0.15rem 0;
    padding: 0.15rem 0;
    color: #fff;
  }
  .slider-bar {
    box-sizing: content-box;
    position: relative;
    flex: 6;
    font-size: 0;
    height: 0.4rem;
    line-height: 0.4rem;
    vertical-align: middle;
    top: 0.15rem;
    .slider-back {
      position: absolute;
      top: calc(50% - 0.02rem);
      left: 0;
      border: 0.04rem solid rgb(108, 108, 108);
      background-color: rgb(108, 108, 108);
      border-radius: 0.02rem;
      height: 0;
      width: 100%;
      cursor: pointer;
    }
    .slider-forword {
      position: absolute;
      top: calc(50% - 0.02rem);
      left: 0;
      border: 0.04rem solid rgb(230, 230, 230);
      background-color: rgb(230, 230, 230);
      border-radius: 0.02rem;
      height: 0;
      width: 0%;
      cursor: pointer;
    }
    .slider-item {
      position: absolute;
      top: calc(50% - 0.075rem);
      left: 30%;
      border: 0.1rem solid rgb(230, 230, 230);
      background-color: rgb(230, 230, 230);
      border-radius: 50%;
      height: 0;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 0px 8px #6cf;
      }
    }
  }
}
</style>

<script lang="ts">
import { useStore } from "vuex";
export default {
  name: "slider",
  emits: ["jump", "move"],
  setup(_: any, context: any) {
    let store = useStore();

    // 跳转进度条
    const jump = (e: any) => {
      if (
        e.target.className === "slider-back" ||
        e.target.className === "slider-forword"
      ) {
        let musicProgress = e.layerX / e.target.parentNode.clientWidth;
        context.emit("jump", musicProgress);
      }
    };

    // 拉动进度条
    const moveSlider = (downEvent: any) => {
      if (downEvent.target.className === "slider-item") {
        let item = downEvent.target;
        let width = parseFloat(item.parentNode.clientWidth); // 获取进度条宽度
        let left = (parseFloat(item.style.left) / 100) * width; // 计算进度
        let from = downEvent.pageX; // 当前进度条相对于页面的位置
        let to = left; // 目标位置
        window.onmousemove = (moveEvent: any) => {
          to = (left + moveEvent.pageX - from) / width;
          if (to > 1) {
            to = 1;
          }
          if (to < 0) {
            to = 0;
          }
          context.emit("move", to);
        };
        window.onmouseup = () => {
          if (window.onmousemove) {
            context.emit("jump", to);
          }
        };
      }
    };
    return { store, jump, moveSlider };
  },
};
</script>