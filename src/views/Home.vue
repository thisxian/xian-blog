<script setup lang="js">
import { Store } from '@/store';
import ArticleItem from '@/views/Home/ArticleItem.vue'
import Search from '@/views/Home/Search.vue'
import Background from '@/views/Home/Background.vue';

const store = Store();
const router = useRouter()

const articles = reactive([
    {
        id: 1,
        title: '谷歌浏览器调试技巧',
        createDate: '2024-03-16',
        updateDate: '2024-03-20',
        category: '前端开发',
        tags: ['Vue3', '教程', '基础'],
        excerpt: '本文详细介绍Vue3组合式API的核心用法，帮助你快速掌握setup语法和响应式系统...'
    }
])

// 前往文章内容详情
function toArticle(title) {
    const route = router.resolve({ path:'/article', query:{title} });
    window.open(route.href, '_blank');
}
</script>

<template>
    <div class="home">
        <!-- 动态背景 -->
        <Background />
        <!-- 站首 -->
        <div class="head">
            <p>Xian的博客</p>
        </div>
        <!-- 文章 -->
        <div class="content">
            <!-- 搜索+文章列表 -->
            <div class="article-box">
                <Search />
                <ArticleItem @click="toArticle(articles[0].title)" v-for="i in 100" :article="articles[0]"/>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.home {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    position: relative;
}


// 站首
.head {
    .size(100%, 400px);
    .centerSon;
    .bgImg("https://s21.ax1x.com/2025/03/07/pEtKh5T.jpg");

    // 背景边缘透明
    -webkit-mask-image: linear-gradient(to top, transparent, black 30px);
    /* 应用遮罩 */
    mask-image: linear-gradient(to top, transparent, black 30px);
    -webkit-mask-size: cover;
    mask-size: cover;

    p {
        font-size: 50px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.8);
    }
}


.content {
    padding: 50px 20px;

    // 文章
    .article-box {
        width: 100%;
        max-width: 800px;
        min-width: 600px;
        min-height: 2000px;
        position: relative;
        z-index: 1;
        left: 0;
        right: 0;
        margin: auto;
    }
}
</style>