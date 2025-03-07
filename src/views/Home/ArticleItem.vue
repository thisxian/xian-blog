<!-- 文章列表子项 -->
<template>
  <div v-for="article in articles" :key="article.id" class="article-item">
    <div class="left">
      <div class="header">
        <h2 class="title">{{ article.title }}</h2>
        <div class="meta">
          <time class="date">📅 创建：{{ formatDate(article.createDate) }}</time>
          <time class="date" v-if="article.updateDate">｜更新：{{ formatDate(article.updateDate) }}</time>
        </div>
      </div>
      <div class="info">
        <span class="category">🏷️ {{ article.category }}</span>
        <div class="tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
      </div>
    </div>
    
    <div class="right">
      <p class="excerpt">{{ article.excerpt }}</p>
    </div>
  </div>
</template>

<script setup>
const articles = ref([
  {
    id: 1,
    title: 'Vue3 组合式API入门指南',
    createDate: '2024-03-15',
    updateDate: '2024-03-20',
    category: '前端开发',
    tags: ['Vue3', '教程', '基础'],
    excerpt: '本文详细介绍Vue3组合式API的核心用法，帮助你快速掌握setup语法和响应式系统...'
  },
  // 更多文章...
])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
</script>

<style scoped>
.article-item {
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  background-color: rgb(253, 253, 253);
  margin-top: 20px;
  display: flex;
  

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}

.left {
  width: 320px;
  flex-shrink: 0;
  .header {
    margin-bottom: 0.75rem;

    .title {
      font-size: 1.25rem;
      color: #2c3e50;
      margin: 0 0 0.5rem;
      line-height: 1.4;
    }

    .meta {
      font-size: 0.85rem;
      color: #666;
    }
  }

  .info {
    display: flex;
    align-items: center;
    font-size: 14px;
    .category {
      background: #ededed;
      padding: 2px 8px;
      border-radius: 4px;
      color: #4b5563;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    }

    .tags {
      display: flex;
      flex-wrap: wrap;

      .tag {
        color: #6b7280;
        padding: 2px 6px;
        background: #f9fafb;
        border-radius: 4px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
        margin-left: 5px;
      }
    }
  }
}

.right {
  flex-grow: 1;
  
  .excerpt {
    color: #666;
    font-size: 16px;
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    
  }
}
</style>