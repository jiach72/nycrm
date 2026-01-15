import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('@/views/Home.vue')
            },
            {
                path: 'services',
                name: 'Services',
                component: () => import('@/views/Services.vue')
            },
            {
                path: 'industries',
                name: 'Industries',
                component: () => import('@/views/Industries.vue')
            },
            {
                path: 'about',
                name: 'About',
                component: () => import('@/views/About.vue')
            },
            {
                path: 'team',
                name: 'Team',
                component: () => import('@/views/Team.vue')
            },
            {
                path: 'contact',
                name: 'Contact',
                component: () => import('@/views/Contact.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router
