import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import My from '@/views/My.vue'

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/my', name: 'my', component: My },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router