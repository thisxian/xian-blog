<template>
  <div class="search-container">
    <!-- 左侧搜索框 -->
    <div class="search-box">
      <input
        type="text"
        placeholder="输入关键词搜索文章..."
        class="search-input"
      >
    </div>

    <!-- 右侧过滤条件 -->
    <div class="filter-container">
      <!-- 分类选择 -->
      <select class="category-select">
        <option value="">全部分类</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>

      <!-- 标签列表 -->
      <div class="tag-list">
        <span
          v-for="tag in tags"
          :key="tag.name"
          class="tag-item"
          :class="{ active: tag.active }"
          @click="toggleTag(tag)"
        >
          {{ tag.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟数据
const categories = ref(['技术', '生活', '旅游', '编程']);
const tags = ref([
  { name: 'Vue', active: false },
  { name: 'JavaScript', active: false },
  { name: 'CSS', active: false },
  { name: '前端', active: false },
]);

const toggleTag = (tag) => {
  tag.active = !tag.active;
};
</script>

<style lang="less" scoped>
.search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 960px;
  margin: 20px auto;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .search-box {
    flex: 1;
    margin-right: 20px;

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

      &::placeholder {
        color: #999999;
      }
    }
  }

  .filter-container {
    display: flex;
    align-items: center;

    .category-select {
      padding: 10px 15px;
      margin-right: 15px;
      font-size: 14px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      background-color: #ffffff;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        border-color: #409eff;
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 4px rgba(64, 158, 255, 0.2);
      }
    }

    .tag-list {
      display: flex;
      align-items: center;

      .tag-item {
        padding: 6px 12px;
        margin-right: 10px;
        font-size: 12px;
        color: #666666;
        background-color: #f5f5f5;
        border: 1px solid #e0e0e0;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.3s;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          color: #409eff;
          border-color: #409eff;
        }

        &.active {
          color: #ffffff;
          background-color: #409eff;
          border-color: #409eff;
        }
      }
    }
  }
}
</style>