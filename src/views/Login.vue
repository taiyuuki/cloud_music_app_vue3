<template>
  <div class="login">
    <LoginTop text="选择登录方式" />
    <div class="select-btn">
      <div class="phone">手机号登录</div>
      <div class="email" @click="emailLogin">邮箱登录</div>
    </div>
  </div>
</template>

<script lang="ts">
import LoginTop from "@/components/login/LoginTop.vue";
import Email from "@/components/login/Email.vue";
import { useRouter } from "vue-router";
export default {
  name: "login",
  components: { Email, LoginTop },
  setup() {
    let router = useRouter();
    const emailLogin = () => {
      router.push({
        name: "email",
      });
    };
    return { emailLogin };
  },
};
</script>

<style lang="less">
.login {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  .select-btn {
    position: relative;
    top: 5rem;
    div {
      margin: 0.25rem auto;
      width: 4rem;
      height: 0.8rem;
      border-radius: 0.4rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.4rem;
      font-family: "微软雅黑", "ht", "heiti", "黑体";
      cursor: pointer;
    }
    .phone {
      background-color: #fff;
      border: 1px solid rgb(255, 0, 119);
      color: rgb(255, 0, 119);
    }
    .email {
      background-color: rgb(255, 0, 119);
      border: 1px solid #fff;
      color: #fff;
    }
  }
}
</style>