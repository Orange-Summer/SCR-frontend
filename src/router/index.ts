import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/HomeLayout.vue'),
      children: [
        {
          path: 'list',
          component: () => import('@/views/CaseList.vue')
        },
        {
          path: 'case/:id',
          name: 'case',
          component: () => import('@/views/CaseDetail.vue')
        }
      ]
    }
  ]
})

export default router
