import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Books from '../components/Books.vue'
import Profile from '../components/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
        path: '/',
        name: 'Books',
        component: Books
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
  ]
})

export default router