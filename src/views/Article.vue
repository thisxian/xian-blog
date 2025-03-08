<script setup lang="js">
import Background from './Home/Background.vue';
import { getArticleApi } from '@/api/data';
// 解析markdown
import { marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { throttle, copyText } from '@/utils/xian.js';


const route = useRoute()
const title = ref(route.query.title);
let articleHTML = ref();    // 文章html
let tocList = reactive([])  // 大纲列表

// 自定义 marked 渲染器
marked.use({
    renderer: {
        // 获取大纲列表
        heading(titleData) {

        },
        // 代码块
        code(code, language) {
            console.log(code, language);
        }

    }
});

marked.use({
    extensions: [
        // 标题添加标题id
        {
            name: 'heading',
            renderer(titleData) {
                // 去掉标题不合法符号(防止标题当作id格式不过关)
                titleData.text.replace(/[^\w ]+/g, '').replace(/ +/g, '-');
                const { text, depth } = titleData;
                tocList.push({ text, depth })
                return `<h${depth} id="${text}">${text}</h${depth}>`;
            }
        },
        // 添加复制按钮
        {
            name: 'code',
            renderer(code) {
                // 分割字符串为行数组
                let text = code.raw.split('\n').slice(1, -1).join('\n');
                // 截取中间部分（跳过第一行和最后一行取删除(--- ---)）
                console.log(text);
                return `<pre class="code-block">
                            <div class="copy-box">
                                <div class="copy-code" style="display:none;">${text}</div>
                                <p class="lang">${code.lang}</p>
                            </div>
                            <code>${code.text}</code>
                        </pre>`;
            }
        }
    ]
})

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

// 大纲标题hover随着屏幕滚动滚动
onMounted(() => {
    const $_elmarker = document.querySelector('.el-anchor__marker')
    let _elmarkerIsShow = true;

    // 监听元素是否可见
    new IntersectionObserver((mutations) => {
        const _status = mutations[0].isIntersecting
        _elmarkerIsShow = _status;
    }).observe($_elmarker)

    window.addEventListener('scroll', throttle(() => {
        // 让元素滑入窗口可见区域
        if (!_elmarkerIsShow) {
            $_elmarker.scrollIntoView({ behavior: "smooth" });
        }
    }, 500))
})


// 初始化复制按钮
onMounted(() => {
    setTimeout(() => {
        ([...document.querySelectorAll('.copy-box')]).forEach($_item => {
            let copyButton = document.createElement("button")
            copyButton.innerHTML = "复制代码";
            copyButton.classList.add("copy-btn")
            copyButton.onclick = function () {
                let copyData = $_item.querySelector('.copy-code').innerHTML;
                copyText(copyData);
                copyButton.innerHTML = "复制成功";
                setTimeout(function () {
                    copyButton.innerHTML = "复制代码";
                }, 1000);
            }
            $_item.appendChild(copyButton)
        });
    }, 100);
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
.article {

    padding-bottom: 60px;
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
    max-width: 1040px;
    min-width: 800px;
    display: flex;
    gap: 20px;
    align-items: flex-start;

    .content {
        flex-grow: 1;
        background-color: white;
        padding: 20px;
        overflow: hidden;
        border-radius: @radius;
        .shadow;


        // markdown样式
        img {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            max-width: 100%;
        }

        // 代码框
        .code-block {
            font-size: 18px;
            background-color: #F8F8F8;
            position: relative;
            background: #f5f5f5;
            border-radius: @radius;
            padding: 50px 30px 20px 20px;
            overflow: hidden;
            display: flex;

            // 复制框
            .copy-box {
                width: 100%;
                height: 30px;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                box-sizing: border-box;


                // border-bottom: 1px solid red;
                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    box-shadow: 0px 1px 2px rgb(174, 174, 174);
                }

                .lang {
                    color: #7a7a7a;
                }

                // 复制代码按钮
                .copy-btn {
                    padding: 4px 8px;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                    background-color: rgba(0, 0, 0, 0);
                    color: #7a7a7a;

                    &:hover {
                        color: #606060;
                    }
                }
            }
        }
    }

    // 大纲
    .toc {
        width: 220px;
        max-height: 100vh;
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


