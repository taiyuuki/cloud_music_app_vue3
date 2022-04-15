<template>
  <transition appear>
    <Tip v-if="showTip" :tiptext="texttip" />
  </transition>
  <LoginTop text="网易邮箱账号登录" />
  <div class="login-email">
    <input type="text" placeholder="请输入邮箱账号" v-model="emailAddress" />
    <input type="password" placeholder="请输入密码" v-model="password" />
    <div class="email" @click="emailLogin">登录</div>
  </div>
</template>

<style lang="less">
@keyframes anim {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
.v-enter-active {
  animation: anim ease-in 0.3s;
}
.v-leave-active {
  animation: anim ease-out 0.3s reverse;
}
.login-email {
  width: 7.1rem;
  margin: 0.5rem 0.2rem 0.2rem 0.2rem;
  z-index: 2;
  input {
    width: 100%;
    display: block;
    border: 0;
    padding: 0 0.2rem;
    outline: none;
    height: 0.8rem;
    margin: 0.1rem;
  }
  .email {
    margin: 0.25rem auto;
    width: 4rem;
    height: 0.8rem;
    border-radius: 0.4rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.4rem;
    font-family: "微软雅黑", "ht", "heiti", "黑体";
    cursor: pointer;
    background-color: rgb(255, 0, 119);
    border: 1px solid #fff;
    color: #fff;
  }
}
</style>

<script lang="ts">
import LoginTop from "@/components/login/LoginTop.vue";
import Tip from "@/components/Tip.vue";
import { ref } from "vue";
import { loginApi } from "@/api/index";
import { useStore } from "vuex";
import UserInfo from "@/api/userinfo";
import { useRouter } from "vue-router";
import { setLS } from "@/api/storage";
export default {
  name: "email",
  components: { LoginTop, Tip },
  setup() {
    let emailAddress = ref("");
    let password = ref("");
    let showTip = ref(false);
    let texttip = ref("");
    let $store = useStore();
    let router = useRouter();

    const showTipWindow = (str: string): void => {
      texttip.value = str;
      showTip.value = true;
      setTimeout(() => {
        showTip.value = false;
      }, 3000);
    };

    const emailLogin = () => {
      if (emailAddress.value.trim() === "") {
        showTipWindow("请输入账号");
      } else if (password.value.trim() === "") {
        showTipWindow("请输入密码");
      } else {
        loginApi({
          email: emailAddress.value,
          password: password.value,
        }).then((data) => {
          if (data) {
            if (data.code === 502) {
              showTipWindow("账号或密码错误");
            } else if (data.code === 200) {
              let userinfo = new UserInfo({
                id: data.account.id,
                isLogin: true,
                userName: data.account.userName,
                avatarUrl: data.profile.avatarUrl,
                backgroundUrl: data.profile.backgroundUrl,
                type: data.account.type,
                vipType: data.account.vipType,
                token: data.token,
                nickname: data.profile.nickname,
              });
              $store.commit("login", userinfo);
              setLS("userinfo", userinfo);
              setLS("cookie", encodeURIComponent(data.cookie));
              router.push({
                name: "user",
              });
            }
          } else {
            showTipWindow("登录超时，请检查网络");
          }
        });
      }
    };
    return { showTip, emailAddress, password, emailLogin, texttip };
  },
};
</script>