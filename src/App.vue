<template>
  <router-view v-if="isRouterActive" :key="$route.fullPath" />
  <TheTabbar v-if="$route.meta.showTabbar" />
</template>

<script setup lang="ts">
import TheTabbar from '@/components/TheTabbar.vue'
import { nextTick, provide, ref } from 'vue'

const isRouterActive = ref<boolean>(true)
provide('reload', () => {
  isRouterActive.value = false
  nextTick(() => {
    isRouterActive.value = true
  })
})
</script>
