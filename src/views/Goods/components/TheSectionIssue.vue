<template>
  <div class="issue">
    <ul class="issue-list">
      <li class="issue-item" v-for="item in issue" :key="item.id">
        <div>
          <h4 class="issue-item__question">
            {{ item.question }}
          </h4>
          <p class="issue-item__answer">
            {{ item.answer }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { GoodsIssue } from '@/types/goods'

interface Props {
  issue?: GoodsIssue[]
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.issue {
  padding: 0 10px;

  &-list {
    margin-left: 20px;
    list-style: disc;

    .issue-item {
      font-size: 13px;

      div {
        margin-left: -4px;

        .issue-item__question {
          margin-bottom: 6px;
          font-weight: 700;
        }

        .issue-item__answer {
          color: #727171;
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
