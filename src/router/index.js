import { createRouter, createWebHistory } from 'vue-router'

// 定义路由
const routes = [
  { path: '/', name: 'Home', component: ()=> import('@/views/Home.vue') }, // 默认路由
  { path: '/test', name: 'Test', component: ()=> import('@/views/Test.vue') },
  { path: '/workspace', name: 'Workspace', component: ()=> import('@/views/Layout.vue') },
  {path: '/editor', name: 'Editor', component: ()=> import('@/components/CanvasEditor') },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router