<!-- 文章列表子项 -->

<script setup>

defineProps({
  article: {
    type: Object,
    default: {
      title: '这是文章标题',
      createDate: '2024-03-15',
      updateDate: '2024-03-20',
      tags: "标签 标签 标签",
      excerpt: '对文章内容进行简单的介绍...'
    }
  },
});


const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}


</script>

<template>
  <div :key="article.id" class="article-item">
    <div class="left">
      <h2 class="title">{{ article.title }}</h2>
      <div class="meta">
        <i class="icon">📅</i>
        <span class="date"> 创建：{{ formatDate(article.createDate) }}</span>
        <span class="date" v-if="article.updateDate">｜更新：{{ formatDate(article.updateDate) }}</span>
      </div>
      <div class="tags">
        <i class="icon">🏷️</i>
        <span v-for="tag in article.tags.split(' ')" :key="tag" class="tag">#{{ tag }}</span>
      </div>
    </div>

    <div class="right">
      <p class="excerpt">{{ article.excerpt }}</p>
    </div>
  </div>
</template>



<style lang="less" scoped>
.article-item {
  height: 130px;
  padding: 15px 30px;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-top: 20px;
  display: flex;
  background-color: rgb(253, 253, 253);
  cursor: pointer;
  .shadow('hover', 1);

  &:hover {
    background-color: rgb(245, 245, 245);
  }
}

.left {
  width: 320px;
  flex: 1;
  flex-shrink: 0;
  font-size: 14px;

  .title {
    font-size: 20px;
    color: #2c3e50;
  }

  .icon {
    width: 25px;
    .centerSon;
    padding-right: 10px;
  }

  .meta {
    color: #666;
    display: flex;
    padding: 10px 0;
  }

  .tags {
    display: flex;

    .tag {
      color: #6b7280;
      padding: 1px 8px;
      background: #f9fafb;
      border-radius: 4px;
      .shadow;

      ~.tag {
        margin-left: 10px;
      }
    }
  }
}

.right {
  flex: 1;
  flex-shrink: 0;
  .textEllipsis(4);
  padding-left: 20px;

  .excerpt {
    color: #666;
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }
}
</style>