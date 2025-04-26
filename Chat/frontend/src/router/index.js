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
        path: '/auth/',
        name: "login",
        component: () => import("../views/auth/AuthLayout.vue"),
    },
    {
        path: "/secured",
        name: 'secured',
        component: () => import("../views/SecuredView.vue"),
        meta: {title: "Espace sécurisé"},
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default router
