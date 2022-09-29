<template>
  <van-swipe>
    <van-swipe-item v-for="item in images" :key="item.id">
      <img :src="item.img_url" :alt="item.img_desc">
    </van-swipe-item>
  </van-swipe>
</template>

<script setup lang="ts">
import type { Gallery } from '@/types/goods'

interface Props {
  images: Gallery[]
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.van-swipe-item {
  img {
    display: block;
    width: 100%;
  }
}
</style>
