<template>
  <div class="channel">
    <van-grid column-num="5">
      <van-grid-item v-for="item in channel" :icon="item.icon_url" :text="item.name" :key="item.id" />
    </van-grid>
  </div>
</template>

<script setup lang="ts">
import type { Channel } from '@/types/home'

interface Props {
  channel: Channel[]
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
/*无样式*/
</style>
