<script setup>

const props = defineProps({
  articleMsgs: {
    type: Array,
    default: () => []
  },
});

const tags = reactive([]);
const hotTags = reactive(['js', 'node', 'c++']);
let activeTag = ref('');
let searchText = ref('')

// 获取标题列表
const stopWatchArticleMsgs = watch(() => props.articleMsgs, (newVal) => {
  if (newVal.length > 0) {
    let _tags = []
    props.articleMsgs.forEach(_ => { _tags.push(..._.tags.split(' ')); });
    tags.push(...new Set(_tags));
    stopWatchArticleMsgs();
  }
}, { deep: true, });

// 展开关闭更多标签
const isExpanded = ref(true);
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

// 点击标签显示标签对应文章
function clickTag(tag) {
  searchText.value = '';
  if (activeTag.value == tag) {
    activeTag.value = '';
    props.articleMsgs.forEach(_ => { _.isShow = true })
  } else {
    activeTag.value = tag;
    props.articleMsgs.forEach(_ => { _.isShow = _.tags.includes(tag) })
  }
};

// 显示搜索的标题
watch(() => searchText, ({ value }) => {
  activeTag.value = '';
  props.articleMsgs.forEach(_ => {
    _.isShow = _.title.toLowerCase().includes(value)
  })
}, { deep: true });


</script>

<template>
  <div class="search-container">
    <!-- 上区域，搜索分类 -->
    <div class="top-box">
      <!-- 左侧搜索框 -->
      <div class="search-box">
        <input type="text" placeholder="输入关键词搜索文章" class="search-input" v-model="searchText">
      </div>

      <!-- 右侧区域 -->
      <div class="right-section">
        <!-- 常驻标签 -->
        <div class="visible-tags" v-show="!isExpanded">
          <span v-for="(tag, index) in hotTags" :key="index" class="tag-item" :class="{ 'active': activeTag == tag }"
            @click="clickTag(tag)">
            {{ tag }}
          </span>
        </div>

        <!-- 更多按钮 -->
        <button class="more-button" @click="toggleExpand">
          {{ isExpanded ? "收起更多" : "更多标签" }}
          <i class="arrow" :class="{ expanded: isExpanded }">▼</i>
        </button>
      </div>
    </div>

    <!-- 底部 展开面板 -->
    <div v-show="isExpanded" class="expand-panel">
      <!-- 全部标签 -->
      <div class="filter-group">
        <div class="tag-list">
          <span v-for="tag in tags" class="tag-item" :class="{ 'active': activeTag == tag }" @click="clickTag(tag)">
            {{ tag }}
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

  // 标签
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
      background-color: #999;
      color: white;
    }

    &:hover {
      outline: 2px solid rgba(0, 0, 0, 0.5);
    }
  }
}

.top-box {
  display: flex;
  max-width: @max-width;
  padding: 15px;

  .search-box {
    flex: 1;
    position: relative;
    overflow: hidden;

    .search-input {
      width: 100%;
      padding: 12px 16px;
      font-size: 14px;
      border: 1px solid #e0e0e0;
      outline: none;
      transition: border-color 0.3s;
      border-radius: @radius;

      &:focus {
        border-color: #333;
        box-shadow: 0 0 4px rgba(64, 158, 255, 0.2);
      }
    }
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    margin-left: 15px;

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
        border-color: #666;
        color: #333;
      }
    }
  }


}

// 展开全部
.expand-panel {
  padding: 20px;
  border-top: 1px solid #eee;
  margin-top: 10px;

  .filter-group {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>