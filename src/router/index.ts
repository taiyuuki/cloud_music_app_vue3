import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => require("@/views/Home.vue").default
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => require("@/views/PlayList.vue").default
  },
  {
    path: '/search',
    name: 'search',
    component: () => require("@/views/SearchMusic.vue").default
  },
  {
    path: '/user',
    name: 'user',
    component: () => require("@/views/User.vue").default
  },
  {
    path: '/login',
    name: 'login',
    component: () => require("@/views/Login.vue").default
  },
  {
    path: '/email',
    name: 'email',
    component: () => require("@/components/login/Email.vue").default
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
