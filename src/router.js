import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/Home.vue'
import Cart from './components/Cart.vue'
import ConfirmEmail from './components/ConfirmEmail.vue'
import Login from './components/Login.vue'
import Product from './components/Product.vue'
import Register from './components/Register.vue'
import Shop from './components/Shop.vue'
const routes = [
    {
        path: '/',
        component: Home
    },
    // {
    //     path: '/about',
    //     component: About
    // },
    // {
    //     path: '/contact',
    //     component: Contact
    // },
    {
        path: '/cart',
        component: Cart
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
        path: '/:catchAll(.*)',
        component: Error
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
