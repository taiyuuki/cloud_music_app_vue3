import { createStore } from 'vuex'

export default createStore({
  state: {
    // 播放模式：0顺序播放，1单曲循环，2随机播放
    playingType: 0,
    // 全局播放状态
    isPlaying: false,
    // 全局播放列表
    musicPlayingList: [] as any[],
    // 当前播放歌曲
    playCurrentMusic: {
      id: 0,
      title: "",
      picUrl: "",
      singer: ""
    },
    // 当前播放歌曲序号
    playIndex: 0,
    // 歌曲时长
    musicDuration: "00:00",
    // 播放时长
    musicCurrentTime: "00:00",
    // 播放进度
    musicProgress: 0,
    // 用户
    user: {
      isLogin: false,
      id: 0,
      userName: "",
      avatarUrl: "",
      backgroundUrl: "",
      type: "",
      vipType: "",
      token: "",
      nickname: "",
    },
    account: {

    }
  },
  mutations: {
    // 添加歌曲至播放列表
    addMusicToPlayList(state: any, music: object) {
      state.musicPlayingList.unshift(music);
      state.playCurrentMusic = music;
    },
    // 播放、停止状态
    playPause(state: any, isPlaying: boolean) {
      state.isPlaying = isPlaying;
    },

    // 切歌
    switchMusic(state: any, i: number) {
      // 随机
      const getRandom = (size: number): number => {
        let result = Math.floor(Math.random() * size);
        if (state.playIndex === result) {
          getRandom(size)
        }
        return result
      }
      // 判断播放模式
      if (state.playingType === 2 && state.musicPlayingList.length > 1) {
        state.playIndex = getRandom(state.musicPlayingList.length);
      } else {
        state.playIndex += i;
        if (i > 0 && state.playIndex >= state.musicPlayingList.length) {
          state.playIndex = 0;
        } else if (i < 0 && state.playIndex < 0) {
          state.playIndex = state.musicPlayingList.length - 1;
        }
      }
      state.playCurrentMusic = state.musicPlayingList[state.playIndex]
    },
    // 切换播放模式
    switchPlayingType(state: any, i: number) {
      state.playingType += i;
    },

    // 登录
    login(state: any, user: any) {
      state.user = user;
    },

    // 读取本地用户信息
    setUserInfo(state: any, user: any) {
      state.user = user;
    },

    // 设置登录状态
    setStatus(state: any) {
      state.user.isLogin = true;
    },

    // 登出
    logout(state: any) {
      state.user.isLogin = false;
    }
  },
  actions: {
    isPlaying(context: any, music?: any) {
      if (context.state.isPlaying === false) {
        context.state.isPlaying = true
      }
      if (music) {
        this.commit("addMusicToPlayList", music)
      } else if (context.state.playingType !== 1) {
        this.commit("switchMusic", 1)
      }

    },
    switchPlayingType(context: any) {
      if (context.state.playingType === 2) {
        this.commit("switchPlayingType", -2)
      } else {
        this.commit("switchPlayingType", 1)
      }
    }
  },
  modules: {
  }
})
