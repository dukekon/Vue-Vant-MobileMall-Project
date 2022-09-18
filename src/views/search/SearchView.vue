<template>
  <div class="search">
    <header>
      <van-search :placeholder="placeholder" v-model="inputValue" show-action @update:model-value="onUpdateInput"
                  @search="onSearch" @focus="onInput" @cancel="onCancel" />
    </header>
    <main>
      <TheHistoryHot v-if="show === 0" :history="historyList" :hot="hotList" @onClickKeyword="onClickKeyword"
                     @clearHistory="clearHistory" />
      <TheNotice v-if="show === 1" :notices="notices" :inputValue="inputValue" @onClickKeyword="onClickKeyword" />
      <TheResult v-if="show === 2" :goodsList="goods" :filerCategory="category" @changeCategory="changeCategory"
                 @changePrice="changePrice" />
    </main>
  </div>
</template>

<script setup lang="ts">
import TheHistoryHot from '@/views/search/components/TheHistoryHot.vue'
import TheNotice from '@/views/search/components/TheNotice.vue'
import TheResult from '@/views/search/components/TheResult.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { getGoodsList, getNoticeData, getSearchData, postClearHistory } from '@/api/search'
import { Show } from '@/views/search/components/show'
import type { Filter, Goods, HotKeyword } from '@/types/search'

//#region 公共变量
const router = useRouter()
// 组件切换
const show = ref<Show>(0)
// 输入框提示
const placeholder = ref<string>('')
// 输入框内容
const inputValue = ref<string>('')
// 搜索提示
const notices = ref<string[]>([])
// 搜索历史
const historyList = ref<string[]>([])
// 热门搜索
const hotList = ref<HotKeyword[]>([])
// 商品列表
const goods = ref<Goods[]>([])
// 商品分类
const category = ref<Filter[]>([])
// 排序方法
const sort = ref<string>('id')
// 排序顺序
const order = ref<string>('')
// 分类id
const categoryId = ref<string>('0')
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

//#region 搜索功能数据请求
const getNotice = async () => {
  const res = await getNoticeData(inputValue.value)
  if (res.errno === 0) {
    notices.value = res.data
  }
}

const getGoods = async () => {
  const res = await getGoodsList({
    keyword: inputValue.value,
    categoryId: categoryId.value,
    sort: sort.value,
    order: order.value,
  })
  if (res.errno === 0) {
    const { goodsList, filterCategory } = res.data
    goods.value = goodsList
    category.value = JSON.parse(JSON.stringify(filterCategory).replace(/id/g, 'value').replace(/name/g, 'text'))
  }
}
//#endregion

//#region 搜索框事件
const onInput = () => {
  onUpdateInput()
}

const onUpdateInput = () => {
  if (inputValue.value) {
    getNotice()
    show.value = 1
  } else {
    show.value = 0
  }
}

const onSearch = () => {
  if (inputValue.value) {
    getGoods()
    show.value = 2
    getIndexData()
  } else {
    showToast('请输入关键字')
  }
}

const onCancel = () => {
  router.go(-1)
}
//#endregion

//#region 接受派发事件
const clearHistory = async () => {
  const res = await postClearHistory()
  if (res.errno === 0) {
    showToast('删除历史成功')
    await getIndexData()
  }
}

const onClickKeyword = (keyword: string) => {
  inputValue.value = keyword
  onSearch()
}

const changeCategory = (value: number) => {
  categoryId.value = value.toString()
  onSearch()
  categoryId.value = '0'
}
const changePrice = (value: string) => {
  if (value === 'default') {
    sort.value = 'id'
  } else {
    sort.value = 'price'
    order.value = value
  }
  onSearch()
  sort.value = 'id'
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
