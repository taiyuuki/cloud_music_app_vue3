import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import PlayList from '../views/PlayList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: PlayList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
