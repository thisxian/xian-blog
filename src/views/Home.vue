<script setup lang="js">
import { Store } from '@/store';
import ArticleItem from '@/views/Home/ArticleItem.vue'
import Search from '@/views/Home/Search.vue'


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
        <div class="article-wrap">
            <div class="article-box">
                <!-- 文章搜索 -->
                <div>
                    <Search />
                </div>

                <!-- 文章列表 -->
                <div class="article-list">
                    <ArticleItem v-for="i in 20" />
                </div>
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

    p {
        font-size: 50px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.8);
    }
}

// 文章
.article-wrap {
    padding: 50px 20px;

    // 这里可以放背景
    .article-box {
        width: 100%;
        max-width: 800px;
        min-width: 600px;
        left: 0;
        right: 0;
        margin: auto;

        // 文章导航
        .article-list {
            min-height: 2000px;
            border-radius: @radius;
            left: 0;
            right: 0;
            margin: auto;
        }
    }
}
</style>