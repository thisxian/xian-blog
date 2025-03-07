<script setup lang="js">
import Background from './Home/Background.vue';
import { getArticleApi } from '@/api/data';
// 解析markdown
import { marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';


const route = useRoute()
const title = ref(route.query.title);
let articleHTML = ref();    // 文章html
let tocHTML = ref();        // 大纲html
let tocList = reactive([])  // 大纲列表

// 自定义 marked 渲染器
marked.use({
    renderer: {
        heading(titleData) {
            // 去掉标题不合法符号(防止标题当作id格式不过关)
            titleData.text.replace(/[^\w ]+/g, '').replace(/ +/g, '-');
            const { text, depth } = titleData;
            tocList.push({ text, depth })
            return `<h${depth} id="${text}">${text}</h${depth}>`;
        }
    }
});

// 配置 marked 代码高亮
marked.use(markedHighlight({
    highlight: (code, lang) => {
        return hljs.highlight(code, { language: lang }).value;
    }
}));


// 获取文章HTML
async function getArticleHTML() {
    if (!title.value) alert('发生错误!');
    const _res = await getArticleApi(title.value); // 请求文章原始数据
    const _text = _res.data.replace(/^---[\s\S]*?---\s*/m, '');  // 去除头部--- ---内的数据
    const _html = marked.parse(_text);
    return _html;
}

// 初始化界面
onMounted(async () => {
    articleHTML.value = await getArticleHTML()
})


</script>

<template>
    <div class="article">
        <Background />


        <p class="title">{{ route.query.title }}</p>
        <div class="content-and-toc">
            <!-- 文章 -->
            <div class="content" v-html="articleHTML"> </div>
            <!-- 大纲 -->
            <div class="toc">
                <el-anchor>
                    <el-anchor-link :class="`title${depth}`" :href="`#${text}`" v-for="{ text, depth } in tocList">
                        {{ text }}
                    </el-anchor-link>
                </el-anchor>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.title {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    padding: 20px 0;
}

.content-and-toc {
    position: relative;
    margin: auto;
    max-width: 1000px;
    min-width: 800px;
    display: flex;
    gap: 10px;

    .content {
        flex-grow: 1;
        background-color: white;
        padding: 20px;
        overflow: hidden;
        border-radius: @radius;
    }

    // 大纲
    .toc {
        width: 220px;
        height: 100vh;
        flex-shrink: 0;
        background-color: white;
        .shadow;
        position: sticky;
        top: 0;
        overflow-y: auto;
        border-radius: @radius;
        padding: 10px 0;

        .title1 {
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
        }

        .title2 {
            text-indent: 1em;
            color: #555;
        }

        .title3 {
            text-indent: 2em;
            color: #777;
        }

        a {
            padding: 10px;
            font-size: 14px;
        }
    }
}
</style>