<script setup lang="js">
import { Store } from '@/store';
import ArticleItem from '@/views/Home/ArticleItem.vue'
import Search from '@/views/Home/Search.vue'
import Background from '@/views/Home/Background.vue';



const store = Store();
const router = useRouter()

let a = ref(100);

function toMy(query) {
    router.push({ name: 'my', })
}
</script>

<template>
    <div class="home">
        <!-- 站首 -->
        <div class="head">
            <p>Xian的博客</p>
        </div>

        <!-- 文章 -->
        <div class="content">
            <!-- 动态背景 -->
            <Background />
            <!-- 搜索+文章列表 -->
            <div class="article-box">
                <Search />
                <ArticleItem v-for="i in 20" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.home {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}


// 站首
.head {
    .size(100%, 400px);
    .bgImg("/img/bgimg.jpg");
    .centerSon;

    -webkit-mask-image: linear-gradient(to top, transparent, black 30px);
    mask-image: linear-gradient(to top, transparent, black 30px);
    mask-size: cover;
    -webkit-mask-size: cover;

    p {
        font-size: 50px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.8);
    }
}


.content {
    padding: 50px 20px;
    position: relative;

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