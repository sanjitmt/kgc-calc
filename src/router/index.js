import { createRouter, createWebHashHistory } from 'vue-router'
import DpsCalc from '../components/DpsCalc.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/dps',
    name: 'DPS',
    component: DpsCalc
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
