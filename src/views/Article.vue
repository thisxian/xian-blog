<script setup lang="js">
import Background from './Home/Background.vue';
import { getArticle } from '@/api/data';
// 解析markdown
import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const route = useRoute()
const title = ref(route.query.title);
let articleHTML = ref(); // 渲染的html(文章)
let tocHTML = ref();     // 渲染的html(大纲)


// 配置marked高亮
const marked = new Marked(
    markedHighlight({
        async: false, // 如果是异步的，可以设置为 true
        langPrefix: 'language-',   // 可选：用于给代码块添加前缀
        emptyLangClass: 'no-lang', // 没有指定语言的代码块会添加这个类名
        highlight: (code) => {
            // 使用 highlight.js 的自动检测功能
            return hljs.highlightAuto(code).value
        }
    })
);



// 在解析 Markdown 时，为所有标题添加唯一 id
const renderer = new marked.Renderer();
renderer.heading = (text, level) => {
    const escapedText = text.toLowerCase()
        .replace(/[^\w ]+/g, '') // 移除非单词字符和空格
        .replace(/ +/g, '-');    // 空格转为短横线
    return `<h${level} id="${escapedText}">${text}</h${level}>`;
};

// 获取文章
onMounted(async () => {
    const _text = await getArticleTEXT();
    // 文章html
    articleHTML.value = marked.parse(_text);
    // 大纲html
    let _tocData = generateToc(_text)
    console.log(_tocData);

    _tocData = [..._tocData, ..._tocData, ..._tocData, ..._tocData, ..._tocData, ..._tocData, ..._tocData]

    tocHTML.value = getTocHTML(_tocData);
})

// 获取文章内容(未html化)
async function getArticleTEXT() {
    if (!title.value) alert('发生错误!');
    const _res = await getArticle(title.value);
    const _text = _res.data.replace(/^---[\s\S]*?---\s*/m, '');  // 去除头部--- ---内的数据
    return _text;
}

// 解析标题并生成大纲数据
function generateToc(markdown) {
    const toc = [];
    const regex = /(?:^|\n)(#{1,6}\s*.+?)(?=\n|$)/g; // 匹配标题（允许无空格）
    let match;

    while ((match = regex.exec(markdown)) !== null) {
        const heading = match[0].trim();
        // 提取标题级别（# 的数量）
        const headingLevel = heading.match(/^#+/)[0].length;
        // 提取标题文本（支持无空格的情况，如 #Hello）
        const text = heading.replace(/^#+\s?/, '');
        // 正确使用 headingLevel 而非未定义的 level
        toc.push({ text, level: headingLevel });
    }
    return toc;
};

// 将大纲渲染为 HTML
function getTocHTML(items) {
    return `<ul>
    ${items.map(item => `
      <li class="title${item.level}">
        <a href="#${item.text}">
        ${item.text}
        </a>
      </li>
    `).join('')}
  </ul>`;
};


</script>

<template>
    <div class="article">
        <Background />
        <p class="title">{{ route.query.title }}</p>
        <div class="content-and-toc">
            <div class="content" v-html="articleHTML"> </div>
            <div class="toc" v-html="tocHTML"></div>
        </div>
    </div>
</template>

<style lang="less">
.article {


    .title {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        padding: 20px 0;
    }

    .content-and-toc {
        position: relative;
        margin: auto;
        width: 1000px;
        display: flex;
        gap: 10px;

        .content {
            max-width: @max-width;
            min-width: @min-width;
            width: 100%;
            background-color: white;
            padding: 20px;
            overflow: hidden;
            border-radius: @radius;
        }

        .toc {
            width: 200px;
            // height: 300px;
            height: 100vh;
            flex-shrink: 0;
            background-color: white;
            .shadow;
            position: sticky;
            top: 0;
            overflow-y: auto;
            border-radius: @radius;

            .title1 {}

            .title2 {
                margin-left: 10px;
            }

            .title3 {
                margin-left: 15px;
            }
        }
    }
}


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