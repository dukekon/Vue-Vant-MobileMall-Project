<template>
  <div class="history-hot">
    <van-cell-group v-if="history.length && hot.length" :border="false">
      <van-cell>
        <template #title>
          <h3>历史记录</h3>
          <van-icon name="delete-o" @click="clearHistory" />
        </template>
        <template #value>
          <van-tag v-for="(item, index) in history" round @click="onClickKeyword(item)" :key="index">
            {{ item }}
          </van-tag>
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <h3>热门搜索</h3>
        </template>
        <template #value>
          <van-tag v-for="(item,index) in hot" round @click="onClickKeyword(item.keyword)" :key="index">
            {{ item.keyword }}
          </van-tag>
        </template>
      </van-cell>
    </van-cell-group>
    <van-loading v-else size="24px" vertical>加载中...</van-loading>
  </div>
</template>

<script setup lang="ts">
import type { HotKeyword } from '@/types/search'

interface Props {
  history: string[]
  hot: HotKeyword[]
}

defineProps<Props>()

interface Emit {
  (e: 'onClickKeyword', value: string): void

  (e: 'clearHistory'): void
}

const emit = defineEmits<Emit>()

const onClickKeyword = (keyword: string) => {
  emit('onClickKeyword', keyword)
}

const clearHistory = () => {
  emit('clearHistory')
}
</script>

<style lang="scss" scoped>
.van-cell-group {
  background-color: rgba(0, 0, 0, 0);

  .van-cell {
    margin-bottom: 10px;
    display: flex;
    flex-flow: column;

    ::v-deep(.van-cell__title) {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .van-icon-delete-o {
        font-size: 18px;
      }
    }

    ::v-deep(.van-cell__value) {
      margin-left: -10px;
      padding-top: 12px;
      display: flex;
      flex-flow: row wrap;

      .van-tag {
        margin-left: 8px;
        margin-bottom: 8px;
        padding: 4px 10px;
        color: #333;
        background-color: #f3f3f3;
      }
    }
  }
}

.van-loading {
  margin-top: 20%;
}
</style>
