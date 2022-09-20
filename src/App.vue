<template>
  <router-view />
  <TheTabbar v-if="$route.meta.showTabbar" />
</template>
<script setup lang="ts">
import TheTabbar from '@/components/TheTabbar.vue'
</script>
