<script setup>
import { ref, computed } from 'vue';

const isExpanded = ref(true);
const selectedCategory = ref('');
const categories = ref(['全部', '技术', '生活', '旅游', '编程']);
const tags = ref([
  { name: 'Vue', active: false },
  { name: 'JavaScript', active: false },
  { name: 'CSS', active: false },
  { name: '前端', active: false },
  { name: 'Node.js', active: false },
  { name: 'Webpack', active: false },
]);

// 常驻显示的标签
const visibleTags = computed(() => tags.value.slice(0, 3));

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const toggleTag = (tag) => {
  tag.active = !tag.active;
};

const selectCategory = (category) => {
  selectedCategory.value = category === selectedCategory.value ? '' : category;
};
</script>

<template>
  <div class="search-container">
    <!-- 上区域，搜索分类 -->
    <div class="top-box">
      <!-- 左侧搜索框 -->
      <div class="search-box">
        <input type="text" placeholder="输入关键词搜索文章..." class="search-input">
      </div>

      <!-- 右侧区域 -->
      <div class="right-section">
        <!-- 常驻标签 -->
        <!-- v-show="!isExpanded" -->
        <div class="visible-tags">
          <span v-for="(tag, index) in visibleTags" :key="tag.name" class="tag-item" :class="{ active: tag.active }"
            @click="toggleTag(tag)">
            {{ tag.name }}
          </span>
        </div>

        <!-- 更多按钮 -->
        <button class="more-button" @click="toggleExpand">
          更多
          <span class="arrow" :class="{ expanded: isExpanded }">▼</span>
        </button>
      </div>
    </div>

    <!-- 底部 展开面板 -->
    <div v-show="isExpanded" class="expand-panel">
      <!-- 分类过滤 -->
      <div class="filter-group">
        <h4 class="filter-title">分类</h4>
        <div class="category-list">
          <span v-for="category in categories" :key="category" class="category-item"
            :class="{ active: selectedCategory === category }" @click="selectCategory(category)">
            {{ category }}
          </span>
        </div>
      </div>

      <!-- 全部标签 -->
      <div class="filter-group">
        <h4 class="filter-title">标签</h4>
        <div class="tag-list">
          <span v-for="tag in tags" :key="tag.name" class="tag-item" :class="{ active: tag.active }"
            @click="toggleTag(tag)">
            {{ tag.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="less" scoped>
.search-container {
  border-radius: @radius;
  overflow: hidden;
  .shadow;
  background-color: white;
}



.top-box {
  display: flex;
  max-width: @max-width;
  padding: 15px;
  border-radius: @radius;


  .search-box {
    flex: 1;
    padding-right: 20px;

    .search-input {
      width: 100%;
      padding: 12px 16px;
      font-size: 14px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      outline: none;
      transition: border-color 0.3s;

      &:focus {
        border-color: #409eff;
        box-shadow: 0 0 4px rgba(64, 158, 255, 0.2);
      }
    }
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;

    .visible-tags {
      display: flex;
    }

    .more-button {
      padding: 6px 15px;
      font-size: 12px;
      color: #666;
      border: 1px solid #e0e0e0;
      border-radius: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 0.3s;

      .arrow {
        font-size: 10px;
        margin-left: 6px;
        transform: rotate(0deg);
        transition: transform 0.3s;

        &.expanded {
          transform: rotate(180deg);
        }
      }

      &:hover {
        border-color: #409eff;
        color: #409eff;
      }
    }


  }


}

// 展开全部
.expand-panel {
  padding: 20px;
  border-top: 1px solid #eee;
  margin-top: 10px;
  // z-index: 10;

  .filter-group {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }


    .category-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
}


// 分类和标签标题
.filter-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #666;
  font-weight: normal;
}

// 分类和标签
.category-item,
.tag-item {
  color: #6b7280;
  padding: 2px 6px;
  background: #f9fafb;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  .shadow;

  &:not(:first-child) {
    margin-left: 12px;
  }


  &.active {
    background: #409eff;
    color: white;
    border-color: #409eff;
  }

  &:hover {
    border-color: #409eff;
  }
}
</style>