import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Article from '@/views/Article.vue'

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/article', name: 'article', component: Article },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router