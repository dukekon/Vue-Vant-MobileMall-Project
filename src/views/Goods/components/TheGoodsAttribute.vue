<template>
  <section class="goods-attribute">
    <h3 class="title">商品参数</h3>
    <ul class="attribute-list" v-for="item in attribute">
      <li class="attribute-item">
        <span class="attribute-item-name">{{ item.name }}</span>
        <span class="attribute-item-value van-ellipsis">{{ item.value }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { GoodsAttribute } from '@/types/goods'

interface Props {
  attribute: GoodsAttribute[]
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.goods-attribute {
  padding: 20px 10px;
  background-color: #fff;

  .title {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 700;
  }

  .attribute-list {
  }

  .attribute-item {
    display: flex;
    margin-bottom: 10px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    background-color: #efefef;

    &-name {
      flex: 1;
      margin-right: 8px;
      text-align: right;
      font-size: 12px;
      color: #727171;
    }

    &-value {
      flex: 3;
      //font-weight: 700;
      color: #000;
    }
  }
}
</style>
