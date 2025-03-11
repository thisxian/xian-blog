<script setup lang="js">
import ArticleItem from '@/views/Home/ArticleItem.vue'
import Search from '@/views/Home/Search.vue'
import Background from '@/views/Home/Background.vue';
import { getArticleMsgs } from '@/api/data.js';
import { getDaysDifference } from '@/utils/index.js';


const router = useRouter()
const articleMsgs = reactive([
    // {
    //     title: '谷歌浏览器调试技巧',
    //     createDate: '2024-03-16',
    //     updateDate: '2024-03-20',
    //     tags: ['Vue3', '教程', '基础'],
    //     excerpt: '本文详细介绍Vue3组合式API的核心用法，帮助你快速掌握setup语法和响应式系统...',
    //     isShow: true
    // }
])

// 初始化
onMounted(async () => {
    const _res = await getArticleMsgs();
    const _data = _res.data;
    _data.forEach(_ => { _.isShow = true; });
    articleMsgs.push(..._data);
})

</script>

<template>
    <div class="home">
        <!-- 动态背景 -->
        <Background />
        <!-- 站首 -->
        <div class="head">
            <p class="title">Xian的博客</p>
        </div>
        <!-- 文章 -->
        <div class="content">
            <div class="side-hide"></div>
            <!-- 搜索+文章列表 -->
            <div class="article-box">
                <Search :articleMsgs="articleMsgs" />
                <router-link :to="`/article/${item.title}`" v-for="item in articleMsgs" v-show="item.isShow"
                    :key="item.title" target="_blank">
                    <ArticleItem :article="item" />
                </router-link>
            </div>
            <div class="side-doc">
                <p>共 {{ articleMsgs.length }} 篇文章</p>
                <p>已运行 {{ getDaysDifference('2025-03-08') }} 天</p>
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
    .size(100%, 320px);
    .centerSon;
    .bgImg("https://s21.ax1x.com/2025/03/07/pEtKh5T.jpg");

    // 背景边缘透明
    -webkit-mask-image: linear-gradient(to top, transparent, black 30px);
    /* 应用遮罩 */
    mask-image: linear-gradient(to top, transparent, black 30px);
    -webkit-mask-size: cover;
    mask-size: cover;

    .title {
        font-size: 50px;
        font-weight: bold;
        color: #2d2d2d;
        font-family: 'Segoe UI', 'Helvetica Neue', -apple-system, system-ui, sans-serif;
        letter-spacing: 2px;
        text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.3);
    }
}


.content {
    padding: 50px 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
    position: relative;

    // 文章
    .article-box {
        width: 100%;
        max-width: @max-width;
        min-width: @min-width;
        min-height: 1000px;
        position: relative;

        a {
            width: 100%;
        }
    }

    .side-hide {
        flex-grow: 1;
        max-width: 220px - 20px;
    }

    .side-doc {
        width: 220px;
        height: 147px;
        background-color: white;
        border-radius: @radius;
        .shadow;
        color: #2C3E50;
        .centerSon;
        font-weight: bold;
        flex-direction: column;
        position: sticky;
        top: 20px;

        p {
            padding: 5px 0;
        }
    }
}
</style>