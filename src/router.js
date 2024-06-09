import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/Home.vue'
import Cart from './components/Cart.vue'
import ConfirmEmail from './components/ConfirmEmail.vue'
import Login from './components/Login.vue'
import Product from './components/Product.vue'
import Register from './components/Register.vue'
import Shop from './components/Shop.vue'
import Logout from './components/Logout.vue'
import Profile from './components/Profile.vue'
import CheckOut from './components/CheckOut.vue'
import ForgotPassword from './components/ForgotPassword.vue'
import ErrorPage from './components/ErrorPage.vue';
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/cart',
        component: Cart,
        meta: { requiresAuth: true } 
    },
    {
        path: '/checkout',
        component: CheckOut,
        meta: { requiresAuth: true } 
    },
    {
        path: '/confirmEmail',
        component: ConfirmEmail
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/forgotPassword',
        component: ForgotPassword
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/shop/:category',
        component: Shop
    },
    {
        path: '/product/:id',
        component: Product
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/logout',
        component: Logout
    },
    {
        path: '/:catchAll(.*)',
        component: ErrorPage
    },
]



const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
