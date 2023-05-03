import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'

import LoginPage from '@/views/LoginPage.vue'
import Signup from '@/views/Signup.vue'
import Discovery from '@/views/Discovery.vue'
import EditUser from '@/views/EditUser.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/discovery',
    component: Discovery,
    meta: { requiresAuth: true }
  },
  {
    path: '/edituser',
    component: EditUser,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.$state.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
