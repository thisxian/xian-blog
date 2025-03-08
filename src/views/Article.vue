<script setup lang="js">
import Background from './Home/Background.vue';
import { getArticleApi } from '@/api/data';
// 解析markdown
import { marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { throttle, copyText } from '@/utils/xian.js';


const route = useRoute();
const title = ref(route.query.title);
let articleHTML = ref();    // 文章html
let tocList = reactive([]);  // 大纲列表
let articleLink = reactive({
    title: '标题',
    category: '分类',
    createDate: '创建时间',
    updateDate: '更新时间',
    excerpt: '简介',
    tags: [],
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
                // 截取中间部分（删除首行```和尾行```）
                return `<pre class="code-block">
                            <div class="copy-box">
                                <div class="copy-code" style="display:none;">${text}</div>
                                <p class="lang">${code.lang}</p>
                            </div>
                            <code class="code-html">${code.text}</code>
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
    Object.assign(articleLink, parseYAMLFrontMatter(_res.data)); // 获取分类标题等数据
    // console.log(articleLink);
    const _text = _res.data.replace(/^---[\s\S]*?---\s*/m, '');  // 去除头部--- ---内的数据
    const _html = marked.parse(_text);
    return _html;
}

// 解析YAML front matter函数
function parseYAMLFrontMatter(content) {
    // 1. 提取YAML内容（使用正则表达式匹配---包裹的部分）
    const match = content.match(/---\s*(.*?)\s*---/s); // s修饰符让.匹配换行符
    if (!match) return null;

    const yamlContent = match[1].trim();

    // 2. 解析键值对
    const lines = yamlContent.split('\n');
    const obj = {};

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine === '') return;

        // 找到第一个冒号的位置，避免多冒号分割错误
        const colonIndex = trimmedLine.indexOf(':');
        if (colonIndex === -1) return;

        const key = trimmedLine.substring(0, colonIndex).trim();
        const value = trimmedLine.substring(colonIndex + 1).trim();

        // 可选：处理特殊字段（如tags转为数组）
        if (key === 'tags') {
            obj[key] = value.split(' ').filter(tag => tag.trim() !== '');
        } else {
            obj[key] = value;
        }
    });

    return obj;
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
        <div class="head">
            <div class="title"> {{ articleLink.title }}</div>
        </div>
        <div class="content-and-toc">
            <!-- 文章 -->
            <div class="content-box">
                <div class="article-link">
                    <p>分类：{{ articleLink.category }}</p>
                    <p>标签：<span v-for="tag in articleLink.tags">{{ tag }}</span></p>
                    <p>创建时间：{{ articleLink.createDate }}</p>
                    <p>更新时间：{{ articleLink.updateDate }}</p>
                </div>
                <div class="article-html" v-html="articleHTML"></div>
            </div>
            <!-- 大纲 -->
            <div class="toc">
                <el-anchor>
                    <el-anchor-link color="#FFFCE6" :class="`title${depth}`" :href="`#${text}`"
                        v-for="{ text, depth } in tocList">
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

.head {
    .size(100%, 320px);
    .bgImg("https://s21.ax1x.com/2025/03/07/pEtKh5T.jpg");
    .centerSon;
    // 背景边缘透明
    -webkit-mask-image: linear-gradient(to top, transparent, black 30px);
    /* 应用遮罩 */
    mask-image: linear-gradient(to top, transparent, black 30px);
    -webkit-mask-size: cover;
    mask-size: cover;

    .title {
        width: 100%;
        .centerSon;
        font-size: 50px;
        font-weight: bold;
        color: rgb(41, 41, 41);
        position: relative;
    }
}


.content-and-toc {
    position: relative;
    margin: auto;
    max-width: 1040px;
    min-width: 800px;
    display: flex;
    gap: 20px;
    align-items: flex-start;

    // 文章内容
    .content-box {
        flex-grow: 1;
        background-color: white;
        padding: 5px 20px 20px;
        overflow: hidden;
        border-radius: @radius;
        .shadow;

        .article-link {
            width: 100%;
            font-size: 12px;
            color: #8A97A4;
            font-weight: bold;
            display: flex;
            justify-content: center;
            gap: 20px;
            span {
                padding: 0 2px;
            }
        }

        .article-html {

            // markdown样式
            img {
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                max-width: 100%;
            }

            li {
                padding: 5px;
                color: #444;
            }

            // 代码框
            .code-block {
                font-size: 16px;
                position: relative;
                background: #f5f5f5;
                border-radius: @radius;
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
                        cursor: pointer;
                        background-color: rgba(0, 0, 0, 0);
                        color: #7a7a7a;

                        &:hover {
                            color: #606060;
                        }
                    }
                }

                .code-html {
                    padding: 50px 30px 20px 20px;
                    overflow-x: auto;
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

        .el-anchor__marker {
            background-color: "#FFFCE6" !important;
        }

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
