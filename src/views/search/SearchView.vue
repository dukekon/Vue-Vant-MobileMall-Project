<template>
  <div class="search">
    <header>
      <van-search :placeholder="placeholder" show-action @cancel="onCancel" />
    </header>
    <main>
      <TheHistoryHot v-if="show === 0" />
      <TheNotice v-if="show === 1" />
      <TheResult v-if="show === 2" />
    </main>
  </div>
</template>

<script setup lang="ts">
import TheHistoryHot from '@/views/search/components/TheHistoryHot.vue'
import TheNotice from '@/views/search/components/TheNotice.vue'
import TheResult from '@/views/search/components/TheResult.vue'
import { Show } from '@/views/search/components/show'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSearchData } from '@/api/search'

//#region 公共变量
const router = useRouter()
// 组件切换
const show = ref<Show>(0)
// 输入框提示
const placeholder = ref<string>('')
// 输入框内容
const inputValue = ref<string>('')
// 搜索历史
const historyList = ref<[]>([])
// 热门搜索
const hotList = ref<[]>([])
//#endregion

//#region 初始化页面数据
const getIndexData = async () => {
  const res = await getSearchData()
  if (res.errno === 0) {
    const { defaultKeyword, historyKeywordList, hotKeywordList } = res.data
    placeholder.value = defaultKeyword.keyword
    historyList.value = historyKeywordList
    hotList.value = hotKeywordList
  }
}

getIndexData()
//#endregion

//#region 顶部搜索框
//#endregion

//#region 事件
const onSearch = () => {
  show.value = 2
}

const onInput = () => {
  if (inputValue.value) {
    show.value = 1
  } else {
    show.value = 0
  }
}

const onUpdateInput = () => {

}

const onCancel = () => {
  router.go(-1)
}
//#endregion
</script>

<style lang="scss" scoped>
.search {
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100vh;
}
</style>
