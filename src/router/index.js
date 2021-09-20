import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home')
const Cart = () => import('@/views/Cart')
const Category = () => import('@/views/Category')
const Profile = () => import('@/views/Profile')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router