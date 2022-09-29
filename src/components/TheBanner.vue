<template>
  <van-swipe>
    <van-swipe-item v-for="item in images" :key="item.id">
      <img :src="item.image_url" :alt="item.name">
    </van-swipe-item>
  </van-swipe>
</template>

<script setup lang="ts">
import type { Banner } from '@/types/home'

interface Props {
  images: Banner[]
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
