<template>
  <TopBar />
  <EmptyBoard v-if="!store.state.user.isLogin" class="login-board">
    <div class="user-portrait">
      <Icon xurl="#icon-yonghu-yuan" />
    </div>
    <div class="login-btn" @click="loginBtn">立即登录</div>
  </EmptyBoard>
  <div class="user" v-if="store.state.user.isLogin">
    <EmptyBoard>
      <div class="user-info">
        <div class="user-avatar">
          <img :src="store.state.user.avatarUrl" alt="" />
        </div>
        <div class="nick-name">{{ store.state.user.nickname }}</div>
      </div>
    </EmptyBoard>
    <EmptyBoard>
      <div
        class="user-playlist-item"
        @click="toggleToMusicList(userPlayList[0].id)"
      >
        <div class="list-cover">
          <img
            v-if="userPlayList[0]"
            :src="userPlayList[0].coverImgUrl"
            alt=""
          />
        </div>
        <div class="list-item">
          <div class="item-name">我喜欢的音乐</div>
          <div v-if="userPlayList[0]" class="item-count">
            {{ userPlayList[0].trackCount }}首
          </div>
        </div>
      </div>
    </EmptyBoard>
    <EmptyBoard>
      <div class="user-playlist" v-if="userPlayList.length > 0">
        <div class="user-playlist-top">
          创建歌单({{ userPlayList.length - 1 }}个)
        </div>
        <template v-for="(item, i) in userPlayList" :key="item.id">
          <div
            v-if="i > 0 && item"
            class="user-playlist-item"
            @click="toggleToMusicList(item.id)"
          >
            <div class="list-cover">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <div class="list-item">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-count">{{ item.trackCount }}首</div>
            </div>
          </div>
        </template>
      </div>
    </EmptyBoard>
  </div>
</template>

<script lang="ts">
import TopBar from "@/components/home/TopBar.vue";
import EmptyBoard from "@/components/EmptyBoard.vue";
import Icon from "@/components/Icon.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive } from "@vue/reactivity";
import { getLS } from "@/api/storage";
import { getUserInfo, getUserPlayList } from "@/api/index";
export default {
  name: "user",
  components: { TopBar, EmptyBoard, Icon },
  setup() {
    let USER_INFO = "userinfo";
    let COOKIE = "cookie";
    let router = useRouter();
    let store = reactive(Object.create(null));
    let userPlayList = reactive([] as any[]);
    store = useStore();

    // 获取本地储存的数据
    if (getLS(USER_INFO)) {
      store.commit("setUserInfo", getLS(USER_INFO));
    }

    // 登录按钮
    const loginBtn = () => {
      router.push({
        name: "login",
      });
    };

    // 获取用户歌单
    getUserInfo(getLS(COOKIE)).then((data) => {
      if (data.account) {
        store.commit("setStatus");
        getUserPlayList(store.state.user.id, getLS(COOKIE)).then((data) => {
          userPlayList.length = 0;
          data.playlist.forEach((item: any, i: number) => {
            userPlayList.push(item);
          });
        });
      } else {
        store.commit("logout");
      }
    });

    // 进入歌单
    const toggleToMusicList = (id: number | string): void => {
      router.push({
        name: "playlist",
        params: {
          id,
        },
      });
    };
    return { loginBtn, store, userPlayList, toggleToMusicList };
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

.user-playlist {
  height: calc(100vh - 8rem);
  overflow: scroll;
}
.user-playlist-top {
  font-size: 0.3rem;
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0.2rem;
}
.user-playlist-item {
  display: flex;
  padding: 0.2rem;
  height: 1.6rem;
  cursor: pointer;
  .list-cover {
    width: 1rem;
    height: 1rem;
    border-radius: 0.2rem;
    overflow: hidden;
    font-size: 0;
    margin: 0.1rem;
    img {
      width: 100%;
    }
  }
  .list-item {
    height: 1rem;
    font-family: "微软雅黑", "ht", "heiti", "黑体";
    .item-name {
      font-size: 0.4rem;
      margin: 0.1rem;
    }
    .item-count {
      font-size: 0.25rem;
      margin: 0.1rem;
      color: rgb(99, 99, 99);
    }
  }
}
</style>