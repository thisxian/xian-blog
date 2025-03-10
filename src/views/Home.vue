<script setup lang="js">
import ArticleItem from '@/views/Home/ArticleItem.vue'
import Search from '@/views/Home/Search.vue'
import Background from '@/views/Home/Background.vue';
import { getArticleMsgs } from '@/api/data';


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
            <p>Xian的博客</p>
        </div>
        <!-- 文章 -->
        <div class="content">
            <!-- 搜索+文章列表 -->
            <div class="article-box">
                <Search :articleMsgs="articleMsgs" />
                <router-link :to="`/article/${item.title}`" v-for="item in articleMsgs" v-show="item.isShow" :key="item.title"
                    target="_blank">
                    <ArticleItem :article="item" />
                </router-link>
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
        max-width: @max-width;
        min-width: @min-width;
        min-height: 2000px;
        position: relative;
        z-index: 1;
        left: 0;
        right: 0;
        margin: auto;
        a{
            width: 100%;
        }
    }
}
</style>