import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("../views/HomeView.vue")
    },
    {
        path: '/about',
        name: 'about',
        meta: {title: "About"},
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/login',
        name: 'login',
    },
    {
        path: '/register',
        name: 'register',
    },
    {
        path: "/secured",
        name: 'secured',
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default router
