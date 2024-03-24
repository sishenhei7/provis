import { createRouter, createWebHistory } from 'vue-router'
import ComponentsView from './pages/Components.vue'

const routes = [
  {
    path: '/components',
    component: ComponentsView,
    alias: ['/'],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
