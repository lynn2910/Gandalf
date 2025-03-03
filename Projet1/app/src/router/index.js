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
        redirect: '/auth/login',
        component: () => import("../views/auth/AuthLayout.vue"),
        children: [
            {
                path: "login",
                name: 'login',
                meta: {title: "Login"},
                components: {
                    auth_body: () => import("../views/auth/LoginView.vue"),
                }
            },
            {
                path: "signup",
                name: 'signup',
                meta: {title: "Créer un compte"},
                components: {
                    auth_body: () => import("../views/auth/SignupView.vue"),
                }
            }
        ]
    },
    {
        path: '/register',
        name: 'register',
        meta: {title: "Login"},
    },
    {
        path: "/secured",
        name: 'secured',
        meta: {title: "Login"},
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default router
