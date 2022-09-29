<template>
  <van-grid class="goods-list" v-if="goodsList.length" column-num="2" gutter="4" :border="false">
    <van-grid-item class="goods-item" v-for="item in goodsList" @click="onClick(item.id)" :key="item.id">
      <img class="goods-item-pic" :src="item.list_pic_url" :alt="item.name" />
      <p class="goods-item-name van-ellipsis">{{ item.name }}</p>
      <p class="goods-item-price">￥{{ item.retail_price }}元</p>
    </van-grid-item>
  </van-grid>
  <van-empty v-else description="无相关商品" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Goods } from '@/types/search'

interface Props {
  goodsList: Goods[]
}

defineProps<Props>()

//#region 点击商品
const router = useRouter()
const onClick = (id: number) => {
  router.push({
    path: '/goods',
    query: {
      id: id.toString(),
    },
  })
}
//#endregion
</script>

<style lang="scss" scoped>
.goods-list {
  padding-top: 4px;

  .goods-item {

    &-pic {
      display: block;
      width: 165.5px;
      height: 165.5px;
    }

    &-name {
      margin-bottom: 10px;
      text-align: center;
      width: 150px;
    }

    &-price {
      text-align: center;
      color: #f00;
    }
  }
}
</style>
