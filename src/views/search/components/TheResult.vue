<template>
  <div class="result">
    <van-dropdown-menu>
      <van-dropdown-item title="综合" disabled />
      <van-dropdown-item title="价格" v-model="price" :options="filterPrice" @change="changePrice" />
      <van-dropdown-item v-model="category" :options="filerCategory" @change="changeCategory" />
    </van-dropdown-menu>
    <TheGoodsList :goodsList="goodsList" />
  </div>
</template>

<script setup lang="ts">
import type { Filter, Goods } from '@/types/search'
import { ref } from 'vue'
import TheGoodsList from '@/components/TheGoodsList.vue'

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

</style>
