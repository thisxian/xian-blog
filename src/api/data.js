import api from './_config.js'

// 获取链接
export function getArticleMsgs() {
    return api({
        method: 'get',
        url: 'link.json',
    })
}

// 获取文章
export function getArticleApi(title) {
    return api({
        method: 'get',
        url:`article/${title}.md`,
    })
}