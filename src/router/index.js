import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import Join from '@/views/Join.vue';
import Login from '@/views/Login.vue';
import Cart from '@/views/Cart.vue';
import Order from '@/views/OrderForm.vue';
import Orders from '@/views/Orders.vue';
import OrderDetail from '@/views/OrderDetail.vue';
import LoginSuccess from '@/views/LoginSuccess.vue';
import PayReadyResult from '@/views/PayReadyResult.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/join',
      name: 'join',
      component: Join
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/orders/:id',
      name: 'orderDetail',
      component: OrderDetail
    },
    {
      path: '/login-success',
      name: 'loginSuccess',
      component: LoginSuccess
    },
    {
      path: '/pay-ready-result',
      name: 'payReadyResult',
      component: PayReadyResult
    }
  ],
})

export default router
