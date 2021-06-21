import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import Tabs from '../views/Tabs.vue'
import { auth } from '../main'


const guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  try {
    if (auth.currentUser?.uid) {
      next();
    }
    else {
      next("/")
    }
  } catch (error) {
    next("/")
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: ()=> import('@/views/Login.vue')
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'user',
        component: () => import('@/views/User.vue')
      },
      {
        path: 'history',
        component: () => import('@/views/History.vue')
      },
      {
        path: 'workout',
        component: () => import('@/views/Workout.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
