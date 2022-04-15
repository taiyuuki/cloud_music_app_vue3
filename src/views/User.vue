<template>
  <TopBar />
  <EmptyBoard v-if="!store.state.user.isLogin" class="login-board">
    <div class="user-portrait">
      <Icon xurl="#icon-yonghu-yuan" />
    </div>
    <div class="login-btn" @click="loginBtn">立即登录</div>
  </EmptyBoard>
  <EmptyBoard v-if="store.state.user.isLogin">
    <div class="user-info">
      <div class="user-avatar">
        <img :src="store.state.user.avatarUrl" alt="" />
      </div>
      <div class="nick-name">{{ store.state.user.nickname }}</div>
    </div>
  </EmptyBoard>
</template>

<script lang="ts">
import TopBar from "@/components/home/TopBar.vue";
import EmptyBoard from "@/components/EmptyBoard.vue";
import Icon from "@/components/Icon.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive } from "@vue/reactivity";
import { getLS, removeLS } from "@/api/storage";
import { getUserInfo, getUserPlayList } from "@/api/index";
export default {
  name: "user",
  components: { TopBar, EmptyBoard, Icon },
  setup() {
    let USER_INFO = "userinfo";
    let COOKIE = "cookie";
    let router = useRouter();
    let store = reactive(Object.create(null));
    store = useStore();

    // 获取本地储存的数据
    if (getLS(USER_INFO)) {
      store.commit("setUserInfo", getLS(USER_INFO));
    }

    const loginBtn = () => {
      router.push({
        name: "login",
      });
    };
    getUserInfo(getLS(COOKIE)).then((data) => {
      if (data.account) {
        store.commit("setStatus");
        getUserPlayList(store.state.user.id, getLS(COOKIE)).then((data) => {
          console.log(data);
        });
      } else {
        removeLS(USER_INFO);
        removeLS(COOKIE);
        store.commit("logout");
      }
    });
    return { loginBtn, store };
  },
};
</script>

<style lang="less">
.login-board {
  position: relative;
  margin-top: 0.7rem;
  cursor: pointer;
  z-index: 0;
  .user-portrait {
    background-color: #fff;
    border-radius: 50%;
    position: relative;
    width: 1.4rem;
    height: 1.4rem;
    top: -0.7rem;
    left: 2.85rem;
    .icon {
      fill: rgb(250, 184, 184);
      width: 1.4rem;
      height: 1.4rem;
    }
    img {
      width: 100%;
    }
  }
  .login-btn {
    margin: -0.8rem auto 0 auto;
    padding: 0.4rem;
    font-size: 0.5rem;
    font-family: "微软雅黑", "ht", "heiti", "黑体";
    text-align: center;
  }
}

.user-info {
  position: relative;
  margin-top: 0.7rem;
  .user-avatar {
    background-color: #fff;
    border-radius: 50%;
    position: relative;
    width: 1.4rem;
    height: 1.4rem;
    top: -0.7rem;
    left: 2.85rem;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .nick-name {
    margin: -0.8rem auto 0 auto;
    padding: 0.4rem;
    font-size: 0.5rem;
    font-family: "微软雅黑", "ht", "heiti", "黑体";
    text-align: center;
  }
}
</style>