import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/characters',
      name: 'characters',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Characters.vue'),
    },
    {
      path: '/characters/:id',
      name: 'singleCharacter',
      component: () => import('../views/HeroCharacter.vue'),
    },
    {
      path: '/heroForm',
      name: 'heroform',
      component: () => import('../views/HeroForm.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/Favorites.vue'),
    },
  ]
})


      export default router
