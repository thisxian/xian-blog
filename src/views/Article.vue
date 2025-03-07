<script setup lang="js">
import { getArticle } from '@/api/data';
const route = useRoute()

let articleContent = ref();


onMounted(async () => {
    const _title = route.query.title;
    if (!_title) alert('发生错误!');
    const _res = await getArticle(_title);
    articleContent.value = _res.data;
})
</script>

<template>
    <div class="article">
        <p>文章</p>

        <div class="content">
            {{ articleContent }}
        </div>
    </div>
</template>

<style lang="less" scoped></style>