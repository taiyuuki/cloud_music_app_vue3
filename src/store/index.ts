import { createStore } from 'vuex'

export default createStore({
  state: {
    isPlaying: false,
    musicPlayingList: [],
    playCurrentMusic: {
      id: 0,
      title: "",
      picUrl: "",
      singer: ""
    }
  },
  mutations: {
    setPlaylist(state: any, value: Array<object>): void {
      state.musicPlayingList = value;
    },
    addMusicToPlayList(state: any, music: object) {
      state.musicPlayingList.unshift(music);
    },
    switchPlayCurrentMusic(state: any, music: any) {
      state.playCurrentMusic = music;
    },
    playPause(state: any, isPlaying: boolean) {
      state.isPlaying = isPlaying;
    }
  },
  actions: {
    switchPlaying(context: any, music: any) {
      if (context.state.isPlaying === false) {
        context.state.isPlaying = true
      }
      this.commit("switchPlayCurrentMusic", music)
    }
  },
  modules: {
  }
})
