import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import PlayList from '@/views/PlayList.vue'
import SearchMusic from '@/views/SearchMusic.vue'
import Login from "@/views/Login.vue"
import User from "@/views/User.vue"
import Email from "@/components/login/Email.vue"

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
  },
  {
    path: '/search',
    name: 'search',
    component: SearchMusic
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/email',
    name: 'email',
    component: Email
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
