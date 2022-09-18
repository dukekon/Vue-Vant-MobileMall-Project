<template>
  <van-list :finished="true">
    <van-cell v-for="(item, index) in notices" :title="item" :key="index" @click="onClickKeyword(item)" />
    <template #finished>
      <a href="javascript:" @click.prevent="onClickKeyword(inputValue)">查看 “{{ inputValue }}” 的搜索结果</a>
    </template>
  </van-list>
</template>

<script setup lang="ts">

interface Props {
  notices: string[]
  inputValue: string
}

defineProps<Props>()

interface Emit {
  (e: 'onClickKeyword', value: string): void
}

const emit = defineEmits<Emit>()

const onClickKeyword = (keyword: string) => {
  emit('onClickKeyword', keyword)
}
</script>

<style lang="scss" scoped>
/*无样式*/
</style>
