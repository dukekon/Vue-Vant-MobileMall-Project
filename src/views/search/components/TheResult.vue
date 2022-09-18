<template>
  <div class="result">
    <van-dropdown-menu>
      <van-dropdown-item title="综合" disabled />
      <van-dropdown-item title="价格" v-model="price" :options="filterPrice" @change="changePrice" />
      <van-dropdown-item v-model="category" :options="filerCategory" @change="changeCategory" />
    </van-dropdown-menu>
    <van-grid class="goods-list" v-if="goodsList.length" column-num="2" gutter="4" :border="false">
      <van-grid-item class="goods-item" v-for="item in goodsList" :key="item.id">
        <img class="goods-item-pic" :src="item.list_pic_url" :alt="item.name" />
        <p class="goods-item-name van-ellipsis">{{ item.name }}</p>
        <p class="goods-item-price">￥{{ item.retail_price }}元</p>
      </van-grid-item>
    </van-grid>
    <van-empty v-else description="无相关商品" />
  </div>
</template>

<script setup lang="ts">
import type { Filter, Goods } from '@/types/search'
import { ref } from 'vue'

interface Props {
  goodsList: Goods[]
  filerCategory: Filter[]
}

defineProps<Props>()

const category = ref<number>(0)
const price = ref<string>('default')

const filterPrice = [
  { value: 'default', text: '默认排序' },
  { value: 'asc', text: '从低到高排序' },
  { value: 'desc', text: '从高到低排序' },
]

//#region 向上派发事件
interface Emit {
  (e: 'changeCategory', value: number): void

  (e: 'changePrice', value: string): void
}

const emit = defineEmits<Emit>()

const changeCategory = (value: number) => {
  emit('changeCategory', value)
}
const changePrice = (value: string) => {
  emit('changePrice', value)
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
