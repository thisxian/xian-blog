<template>
  <div class="nav-container">
    <!-- 第一行：搜索框 + 分类按钮 -->
    <div class="search-row">
      <div class="search-box">
        <input type="text" placeholder="搜索文章" v-model="searchKeyword" class="search-input">
      </div>
      <button class="category-btn">分类</button>
    </div>

    <!-- 第二行：标签 + 更多按钮 -->
    <div class="tags-row">
      <div class="tags-wrapper">
        <span v-for="tag in visibleTags" :key="tag" class="tag">
          {{ tag }}
        </span>
        <span v-for="tag in expandedTags" v-if="showMore" :key="'expanded-' + tag" class="tag">
          {{ tag }}
        </span>
      </div>
      <button v-if="hiddenTagsCount > 0" class="more-btn" @click="toggleMore">
        {{ showMore ? '收起' : '更多' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  tags: {
    type: Array,
    default: () => ['Vue', 'React', 'Node.js', 'CSS', 'HTML', 'Webpack', 'TypeScript', '前端', '后端', '工程化', '性能优化']
  }
})

const searchKeyword = ref('')
const showMore = ref(false)

// 基础显示数量
const baseVisibleCount = 5

// 处理后的标签列表
const processedTags = computed(() => {
  return props.tags.filter(tag =>
    tag.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

// 常驻可见标签
const visibleTags = computed(() => {
  return processedTags.value.slice(0, baseVisibleCount)
})

// 展开后追加的标签
const expandedTags = computed(() => {
  return processedTags.value.slice(baseVisibleCount)
})

// 隐藏标签数量
const hiddenTagsCount = computed(() => {
  return processedTags.value.length - baseVisibleCount
})

const toggleMore = () => {
  showMore.value = !showMore.value
}
</script>

<style lang="less" scoped>
.nav-container {
  margin: 0 auto;
  padding: 16px;
  box-shadow: @box-shadow;
  border-radius: 8px;


  .search-row {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;

    .search-box {
      flex: 1;

      .search-input {
        width: 100%;
        padding: 8px 16px;
        border: 2px solid #409eff;
        border-radius: 20px;
        outline: none;

        &:focus {
          box-shadow: 0 0 5px rgba(64, 158, 255, 0.3);
        }
      }
    }

    .category-btn {
      padding: 8px 24px;
      background: #f0f4f8;
      border: none;
      border-radius: 20px;
      color: #606266;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #e0e4e8;
      }
    }
  }

  .tags-row {
    position: relative;
    min-height: 40px;

    .tags-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-right: 70px;
      /* 为更多按钮留空间 */
    }

    .tag {
      padding: 6px 12px;
      background: #f5f7fa;
      border-radius: 15px;
      color: #606266;
      font-size: 14px;
      white-space: nowrap;
    }

    .more-btn {
      position: absolute;
      right: 0;
      top: 0;
      padding: 6px 12px;
      background: none;
      border: none;
      color: #409eff;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>