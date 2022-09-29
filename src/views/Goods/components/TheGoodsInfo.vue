<template>
  <section class="goods-info">
    <h2 class="title">{{ info.name }}</h2>
    <div class="brief">{{ info.goods_brief }}</div>
    <div class="price">{{ priceFixed(info.retail_price ?? ' ---') }}</div>
  </section>
</template>

<script setup lang="ts">
import { priceFixed } from '@/utils/priceFixed'
import type { GoodsInfo } from '@/types/goods'

interface Props {
  info: GoodsInfo
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.goods-info {
  margin-bottom: 20px;
  padding: 30px 0 20px;
  text-align: center;
  background-color: #fff;

  .title {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
  }

  .brief {
    margin-bottom: 10px;
    color: #838382;
  }

  .price {
    font-size: 20px;
    color: red;
  }
}
</style>
