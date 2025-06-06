<script lang='ts' setup>
import { defineEmits, ref, onBeforeUnmount } from 'vue'
import { debounce } from 'lodash'

interface SearchEmit{
  (e: 'search', keyword: string): void
}

const keyword = ref<string>('')

const emit = defineEmits<SearchEmit>()

// 普通的搜索处理函数（按钮点击时调用）
const handleSearch = () => {
  emit('search', keyword.value)
}

// 防抖搜索处理函数（输入时调用）
const debouncedSearch = debounce(() => {
  if (keyword.value.trim()) {
    emit('search', keyword.value)
  }
}, 500)

// 监听输入事件
const handleInput = () => {
  if (keyword.value.trim()) {
    debouncedSearch()
  }
}

// 组件销毁前取消防抖
onBeforeUnmount(() => {
  debouncedSearch.cancel()
})
</script>

<template>
  <div class="form-control mb-6">
      <div class="input-group">
        <input 
          type="text" 
          placeholder="搜索话题..." 
          class="input input-bordered w-9/10" 
          v-model="keyword" 
          @input="handleInput"
          @keydown.enter="handleSearch" 
        />
        <button class="btn btn-square ml-10" @click="handleSearch">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
    </div>
</template>