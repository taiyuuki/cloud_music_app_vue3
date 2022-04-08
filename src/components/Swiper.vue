<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="0"
    :pagination="{ clickable: true }"
    class="swiper-container"
  >
    <swiper-slide v-for="(item, i) in imgArr"
      ><img :src="item.pic" :key="i"
    /></swiper-slide>
  </swiper>
</template>
<script lang="ts">
import { onMounted, reactive } from "vue";
import { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import getAxios from "../hook/get-axios";

// Import Swiper styles
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    let imgArr = reactive([]);
    onMounted(() => {
      getAxios()
        .get("/banner?type=1")
        .then((res) => {
          res.data.banners.forEach((item: never) => {
            imgArr.push(item);
          });
        });
    });
    return {
      modules: [Pagination, A11y],
      imgArr,
    };
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  width: 7.1rem;
  height: 2.76rem;
  border-radius: 0.1rem;
  margin: 0.2rem;
  img {
    width: 100%;
    cursor: pointer;
  }
}
</style>