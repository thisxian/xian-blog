import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import Article from '@/views/Article.vue'

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/article/:title?', name: 'article', component: Article },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router