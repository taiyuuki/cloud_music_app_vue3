<template>
  <div class="buttom-menu">
    <router-link to="/" active-class="active">
      <div class="icon-ball">
        <Icon xurl="#icon-faxian" />
      </div>
      <div class="text">发现</div>
    </router-link>
    <router-link to="/user" active-class="active">
      <div class="icon-ball">
        <Icon xurl="#icon-yinle" />
      </div>
      <div class="text">我的</div>
    </router-link>
  </div>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";
export default {
  name: "buttom-menu",
  components: { Icon },
};
</script>

<style lang="less">
.buttom-menu {
  width: 7.5rem;
  height: 1rem;
  position: absolute;
  bottom: 0.4rem;
  padding: 0.1rem 0;
  display: flex;
  justify-content: space-around;
  color: rgb(182, 182, 182);
  a {
    text-decoration: none;
    color: rgb(182, 182, 182);
  }
  .text {
    font-size: 0.3rem;
    text-align: center;
    margin: 0.1rem;
  }
  .icon-ball {
    fill: rgb(182, 182, 182);
    border-radius: 50%;
    width: 0.8rem;
    height: 0.8rem;
    .icon {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
  .active {
    .icon-ball {
      fill: #fff;
      background-color: rgb(255, 0, 119);
    }
    color: rgb(255, 0, 119);
    font-weight: bold;
  }
}
</style>