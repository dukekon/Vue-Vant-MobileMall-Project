<template>
  <div class="goods-desc" v-html="info.goods_desc"></div>
</template>

<script setup lang="ts">
import type { GoodsInfo } from '@/types/goods'

interface Props {
  info: GoodsInfo
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.goods-desc {
  margin-bottom: 20px;

  ::v-deep(img) {
    display: block;
    width: 100%;
  }

  ::v-deep(br:first-of-type) {
    display: none;
  }
}
</style>
