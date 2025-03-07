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

    tocList = [...tocList, ...tocList, ...tocList, ...tocList, ...tocList, ...tocList, ...tocList]
})

</script>

<template>
    <div class="article">
        <Background />
        <p class="title">{{ route.query.title }}</p>
        <div class="content-and-toc">
            <div class="content" v-html="articleHTML"> </div>
            <div class="toc">
                <a :class="`title${depth}`" :href="`#${text}`" v-for="{ text, depth } in tocList">
                    {{ text }}
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="less">
html {
    scroll-behavior: smooth;
    /* 全局生效 */
}

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
        cursor: pointer;
        padding: 10px 0;
        display: flex;
        flex-direction: column;

        a {
            height: 55px;
            display: block;
            padding: 10px 15px;
        }

        font-size: 14px;
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
    }
}

// ----------------------------------------------------------------------------
/* 定制滚动条整体 */
::-webkit-scrollbar {
    width: 4px;
    /* 宽度 */
}

/* 定制滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    /* 轨道颜色 */
}

/* 定制滚动条滑块 */
::-webkit-scrollbar-thumb {
    background-color: #888;
    /* 滑块颜色 */
    border-radius: 6px;
    /* 圆角 */
}

/* 滑块在鼠标悬停时改变颜色 */
::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}
</style>